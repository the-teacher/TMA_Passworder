import { runQuery } from '@libs/sqlite';

/**
 * Migration: create_users
 * Created at: 2025-03-17T10:28:49.774Z
 */

export const up = async (dbPath: string): Promise<void> => {
  // Code for applying migration
  await runQuery(
    dbPath,
    `CREATE TABLE users (
        id             INTEGER PRIMARY KEY AUTOINCREMENT,
        name           TEXT NOT NULL,
        email          TEXT UNIQUE NOT NULL,
        is_active      INTEGER DEFAULT 0 CHECK (is_active IN (0, 1)),  -- 0 = Not Activated, 1 = Activated
        activation_pin TEXT,  -- 4-digit PIN for email confirmation
        created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
  );
};

export const down = async (dbPath: string): Promise<void> => {
  // Code for rolling back migration
  await runQuery(dbPath, `DROP TABLE IF EXISTS users;`);
};
