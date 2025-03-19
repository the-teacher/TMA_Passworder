import { runQuery } from '@libs/sqlite';

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
      uid         TEXT NOT NULL UNIQUE, -- Unique identifier for activation
      userId      INTEGER, -- Optional link to user (can be NULL for pre-registration)
      pinCode     TEXT NOT NULL,  -- 4 or 6 digit PIN
      used        INTEGER DEFAULT 0 CHECK (used IN (0, 1)),  -- 0 = Not Used, 1 = Used
      expiresAt   TIMESTAMP NOT NULL,  -- Expiration time (e.g., 10 minutes)
      createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );`,
  );
};

export const down = async (dbPath: string): Promise<void> => {
  // Code for rolling back migration
  await runQuery(dbPath, `DROP TABLE IF EXISTS email_activations;`);
};
