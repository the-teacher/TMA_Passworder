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
      userId        INTEGER NOT NULL,
      tokenId       TEXT NOT NULL UNIQUE,  -- Unique session ID (UUID)
      refreshToken  TEXT NOT NULL UNIQUE,  -- Refresh token for renewing JWT
      userAgent     TEXT,  -- Browser or device information
      ipAddress     TEXT,  -- User's IP address
      createdAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expiresAt     TIMESTAMP DEFAULT (DATETIME('now', '+7 days')),  -- JWT expiration (7 days)
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );`,
  );
};

export const down = async (dbPath: string): Promise<void> => {
  // Code for rolling back migration
  await runQuery(dbPath, `DROP TABLE IF EXISTS auth_sessions;`);
};
