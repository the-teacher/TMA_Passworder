import { runQuery } from '@libs/sqlite';

/**
 * Migration: create_auth_providers
 * Created at: 2025-03-17T10:31:29.807Z
 */

export const up = async (dbPath: string): Promise<void> => {
  // Code for applying migration
  await runQuery(
    dbPath,
    `CREATE TABLE auth_providers (
        id             INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id        INTEGER NOT NULL,
        provider       TEXT NOT NULL CHECK (provider IN ('email', 'telegram', 'gmail', 'github')),
        provider_id    TEXT NOT NULL,  -- Unique ID per provider (email, Telegram ID, GitHub ID, etc.)
        provider_data  TEXT, -- Optional metadata (e.g., OAuth tokens)
        created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`,
  );
};

export const down = async (dbPath: string): Promise<void> => {
  // Code for rolling back migration
  await runQuery(dbPath, `DROP TABLE IF EXISTS auth_providers;`);
};
