import { runQuery } from '@libs/sqlite/runQuery';

/**
 * Migration: email_activations
 * Created at: 2025-03-17T10:42:06.130Z
 */

export const up = async (dbPath: string): Promise<void> => {
  // Code for applying migration
  await runQuery(
    dbPath,
    `CREATE TABLE email_activations (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id     INTEGER NOT NULL,
      pin_code    TEXT NOT NULL,  -- 4-digit PIN
      expires_at  TIMESTAMP NOT NULL,  -- Expiration time (e.g., 10 minutes)
      used        INTEGER DEFAULT 0 CHECK (used IN (0, 1)),  -- 0 = Not Used, 1 = Used
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`,
  );
};

export const down = async (dbPath: string): Promise<void> => {
  // Code for rolling back migration
  await runQuery(dbPath, `DROP TABLE IF EXISTS email_activations;`);
};
