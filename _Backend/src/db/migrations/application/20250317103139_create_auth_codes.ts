import { runQuery } from '@libs/sqlite/runQuery';

/**
 * Migration: create_auth_codes
 * Created at: 2025-03-17T10:31:39.737Z
 */

export const up = async (dbPath: string): Promise<void> => {
  // Code for applying migration
  await runQuery(
    dbPath,
    `CREATE TABLE auth_codes (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id     INTEGER NOT NULL,
        code        TEXT NOT NULL,  -- One-time login code (e.g., 6-digit numeric)
        expires_at  TIMESTAMP NOT NULL,  -- Expiration time (e.g., 10 minutes)
        used        INTEGER DEFAULT 0 CHECK (used IN (0, 1)),  -- Mark as used
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`,
  );
};

export const down = async (dbPath: string): Promise<void> => {
  // Code for rolling back migration
  await runQuery(dbPath, `DROP TABLE IF EXISTS auth_codes;`);
};
