# 🔐 Authentication System Documentation

## 📌 Overview

This authentication system is designed to provide **passwordless login** using email-based **one-time codes**.
It supports multiple authentication providers (**email, Telegram, Google, GitHub**) and includes **email verification** before login.

---

## 🏗 Database Schema

### **1️⃣ Users Table (`users`)**

Stores core user information and email activation status.

```sql
CREATE TABLE users (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT NOT NULL,
    email          TEXT UNIQUE NOT NULL,
    is_active      INTEGER DEFAULT 0 CHECK (is_active IN (0, 1)),  -- 0 = Not Activated, 1 = Activated
    activation_pin TEXT,  -- 4-digit PIN for email confirmation
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **2️⃣ Email Activations Table (`email_activations`)**

Stores one-time **4-digit PIN codes** for email verification.

```sql
CREATE TABLE email_activations (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    pin_code    TEXT NOT NULL,  -- 4-digit PIN
    expires_at  TIMESTAMP NOT NULL,  -- Expiration time (e.g., 10 minutes)
    used        INTEGER DEFAULT 0 CHECK (used IN (0, 1)),  -- 0 = Not Used, 1 = Used
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### **3️⃣ Authentication Providers Table (`auth_providers`)**

Stores different authentication methods linked to each user.

```sql
CREATE TABLE auth_providers (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id        INTEGER NOT NULL,
    provider       TEXT NOT NULL CHECK (provider IN ('email', 'telegram', 'gmail', 'github')),
    provider_id    TEXT NOT NULL,  -- Unique ID per provider (email, Telegram ID, GitHub ID, etc.)
    provider_data  TEXT, -- Optional metadata (e.g., OAuth tokens)
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### **4️⃣ Authentication Codes Table (`auth_codes`)**

Stores **one-time login codes** sent via email.

```sql
CREATE TABLE auth_codes (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    code        TEXT NOT NULL,  -- One-time login code (e.g., 6-digit numeric)
    expires_at  TIMESTAMP NOT NULL,  -- Expiration time (e.g., 10 minutes)
    used        INTEGER DEFAULT 0 CHECK (used IN (0, 1)),  -- Mark as used
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### **5️⃣ Authentication Sessions Table (`auth_sessions`)**

Stores active JWT sessions and refresh tokens.

```sql
CREATE TABLE auth_sessions (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id       INTEGER NOT NULL,
    token_id      TEXT NOT NULL UNIQUE,  -- Unique session ID (UUID)
    refresh_token TEXT NOT NULL UNIQUE,  -- Refresh token for renewing JWT
    user_agent    TEXT,  -- Browser or device information
    ip_address    TEXT,  -- User's IP address
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at    TIMESTAMP DEFAULT (DATETIME('now', '+7 days')),  -- JWT expiration (7 days)
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🔄 Authentication Flow

### **1️⃣ User Registration**

- The user enters an **email**.
- If the email **does not exist**, a **4-digit PIN** is generated and sent via email.
- The PIN is stored in `email_activations` and expires in **10 minutes**.

```sql
INSERT INTO email_activations (user_id, pin_code, expires_at)
VALUES (?, ?, DATETIME('now', '+10 minutes'));
```

---

### **2️⃣ Email Activation**

- The user enters the **4-digit PIN**.
- The system checks if the **PIN is valid and not expired**:

```sql
SELECT user_id FROM email_activations
WHERE pin_code = ? AND expires_at > DATETIME('now') AND used = 0;
```

- If valid, mark the PIN as **used** and activate the user:

```sql
UPDATE email_activations SET used = 1 WHERE pin_code = ?;
UPDATE users SET is_active = 1 WHERE id = ?;
```

---

### **3️⃣ Login with One-Time Code**

- After activation, the user can **request a one-time login code**.
- The system generates a **6-digit login code**, stores it in `auth_codes`, and emails it to the user.

```sql
INSERT INTO auth_codes (user_id, code, expires_at)
VALUES (?, ?, DATETIME('now', '+10 minutes'));
```

- The user enters the **one-time code**, and if valid, a **JWT session** is created.

---

### **4️⃣ JWT & Refresh Token Management**

- The user logs in with a **short-lived JWT** (~1 hour).
- A **refresh token** is stored in `auth_sessions` to renew expired JWTs.

```sql
INSERT INTO auth_sessions (user_id, token_id, refresh_token, user_agent, ip_address)
VALUES (?, ?, ?, ?, ?);
```

- To refresh a session, the user sends their **refresh token**.
- If valid, a **new JWT and refresh token** are generated.

```sql
UPDATE auth_sessions
SET refresh_token = ?, expires_at = DATETIME('now', '+7 days')
WHERE token_id = ? AND user_id = ?;
```

---

### **5️⃣ Logout Process**

#### **Logout from a single device**

```sql
DELETE FROM auth_sessions WHERE token_id = ?;
```

#### **Logout from all devices**

```sql
DELETE FROM auth_sessions WHERE user_id = ?;
```

---

## 🛡 Security Considerations

✔ **Prevent unauthorized logins** if the user mistypes their email.
✔ **Block brute-force attempts** by limiting activation retries.
✔ **Ensure only verified emails can request login codes.**
✔ **Auto-expire unverified accounts** after 24 hours of inactivity.

---

## 📌 Next Steps

1. **Rate-limit activation attempts** (max **5 per hour**).
2. **Allow users to resend PIN** if they lose the email.
3. **Implement token revocation** for increased security.
