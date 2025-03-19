import { runSqlQuery, type SQLiteDatabase } from '@libs/sqlite';

/**
 * Migration: create_auth_codes
 * Created at: 2025-03-17T10:31:39.737Z
 */

export const up = async (db: SQLiteDatabase): Promise<void> => {
  // Code for applying migration
  await runSqlQuery(
    db,
    `CREATE TABLE auth_codes (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        userId      INTEGER NOT NULL,
        code        TEXT NOT NULL,  -- One-time login code (e.g., 6-digit numeric)
        used        INTEGER DEFAULT 0 CHECK (used IN (0, 1)),  -- Mark as used
        expiresAt   TIMESTAMP NOT NULL,  -- Expiration time (e.g., 10 minutes)
        createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );`,
  );
};

export const down = async (db: SQLiteDatabase): Promise<void> => {
  // Code for rolling back migration
  await runSqlQuery(db, `DROP TABLE IF EXISTS auth_codes;`);
};
