import { runQuery } from '@libs/sqlite';

/**
 * Migration: create_auth_sessions
 * Created at: 2025-03-17T10:31:48.087Z
 */

export const up = async (dbPath: string): Promise<void> => {
  // Code for applying migration
  await runQuery(
    dbPath,
    `CREATE TABLE auth_sessions (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id       INTEGER NOT NULL,
      token_id      TEXT NOT NULL UNIQUE,  -- Unique session ID (UUID)
      refresh_token TEXT NOT NULL UNIQUE,  -- Refresh token for renewing JWT
      user_agent    TEXT,  -- Browser or device information
      ip_address    TEXT,  -- User's IP address
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expires_at    TIMESTAMP DEFAULT (DATETIME('now', '+7 days')),  -- JWT expiration (7 days)
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`,
  );
};

export const down = async (dbPath: string): Promise<void> => {
  // Code for rolling back migration
  await runQuery(dbPath, `DROP TABLE IF EXISTS auth_sessions;`);
};
