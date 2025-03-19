import { runSqlQuery, type SQLiteDatabase } from '@libs/sqlite';

/**
 * Migration: create_auth_providers
 * Created at: 2025-03-17T10:31:29.807Z
 */

export const up = async (db: SQLiteDatabase): Promise<void> => {
  // Code for applying migration
  await runSqlQuery(
    db,
    `CREATE TABLE auth_providers (
        id             INTEGER PRIMARY KEY AUTOINCREMENT,
        userId         INTEGER NULL REFERENCES users(id) ON DELETE CASCADE,
        provider       TEXT NOT NULL CHECK (provider IN ('email', 'telegram', 'gmail', 'github')),
        providerId     TEXT NOT NULL,  -- Unique ID per provider (email, Telegram ID, GitHub ID, etc.)
        providerData   TEXT NULL, -- Optional metadata (e.g., OAuth tokens)
        createdAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(provider, providerId)
    );`,
  );
};

export const down = async (db: SQLiteDatabase): Promise<void> => {
  // Code for rolling back migration
  await runSqlQuery(db, `DROP TABLE IF EXISTS auth_providers;`);
};
