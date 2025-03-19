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
        uid            TEXT NOT NULL UNIQUE, -- Unique string ID (12 chars) used for user data directory
        name           TEXT NOT NULL,
        email          TEXT UNIQUE NOT NULL,
        status         TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive')), -- User status
        createdAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
  );
};

export const down = async (dbPath: string): Promise<void> => {
  // Code for rolling back migration
  await runQuery(dbPath, `DROP TABLE IF EXISTS users;`);
};
