/**
 * Migration: create_users_table
 * Created at: 2025-03-13T12:52:23.048Z
 */

// yarn tsx src/libs/the-mirgator/src/migrationRunner.ts up \
//  ./db/sqlite/application/application.sqlite
// ./db/migrations/application/20250313125223_create_users_table.ts

import { runQuery } from '@libs/sqlite';

export const up = async (dbPath: string): Promise<void> => {
  await runQuery(
    dbPath,
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      telegram_uid TEXT NOT NULL UNIQUE,
      telegram_login TEXT,
      telegram_first_name TEXT,
      telegram_last_name TEXT,
      telegram_premium BOOLEAN DEFAULT 0,
      email TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
  );
};

export const down = async (dbPath: string): Promise<void> => {
  await runQuery(dbPath, 'DROP TABLE IF EXISTS users');
  console.log('Migration down: Dropped users table');
};
