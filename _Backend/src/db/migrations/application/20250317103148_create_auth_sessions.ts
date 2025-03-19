import { runSqlQuery, type SQLiteDatabase } from '@libs/sqlite';

/**
 * Migration: create_auth_sessions
 * Created at: 2025-03-17T10:31:48.087Z
 */

export const up = async (db: SQLiteDatabase): Promise<void> => {
  // Code for applying migration
  await runSqlQuery(
    db,
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

export const down = async (db: SQLiteDatabase): Promise<void> => {
  // Code for rolling back migration
  await runSqlQuery(db, `DROP TABLE IF EXISTS auth_sessions;`);
};
