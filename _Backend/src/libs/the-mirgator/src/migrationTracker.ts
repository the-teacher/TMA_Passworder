import path from 'path';
import { runQuery } from '@libs/sqlite/runQuery';
import { getAllQuery, getFirstQuery } from '@libs/sqlite/getQuery';

/**
 * The Migrator - Migration Tracker
 *
 * This module provides functionality for tracking applied migrations in a database.
 *
 * @module the-migrator/migrationTracker
 */

/**
 * Extracts migration timestamp from filename
 * @param migrationPath Path to migration file
 * @returns Migration timestamp
 */
export const getMigrationTimestamp = (migrationPath: string): string => {
  const filename = path.basename(migrationPath);
  const match = filename.match(/^(\d{14})_/);

  if (!match) {
    throw new Error(`Invalid migration filename format: ${filename}`);
  }

  return match[1];
};

/**
 * Ensures migrations table exists in database
 * @param dbPath Path to the database file
 * @returns Promise that resolves when the table is created or already exists
 */
export const ensureMigrationsTable = async (dbPath: string): Promise<void> => {
  await runQuery(
    dbPath,
    `
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL UNIQUE,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `,
  );
};

/**
 * Records a migration in the database
 * @param dbPath Path to the database file
 * @param migrationTimestamp Migration timestamp
 */
export const recordMigration = async (
  dbPath: string,
  migrationTimestamp: string,
): Promise<void> => {
  await runQuery(dbPath, `INSERT INTO migrations (timestamp) VALUES (?)`, [migrationTimestamp]);
};

/**
 * Checks if a migration has been applied
 * @param dbPath Path to the database file
 * @param migrationTimestamp Migration timestamp
 * @returns Whether the migration has been applied
 */
export const isMigrationApplied = async (
  dbPath: string,
  migrationTimestamp: string,
): Promise<boolean> => {
  // Ensure migrations table exists before querying
  await ensureMigrationsTable(dbPath);

  const row = await getFirstQuery<{ id: number }>(
    dbPath,
    'SELECT id FROM migrations WHERE timestamp = ?',
    [migrationTimestamp],
  );

  return !!row;
};

/**
 * Gets all applied migrations from database
 * @param dbPath Path to the database file
 * @returns Array of applied migrations
 */
export const getAppliedMigrations = async (dbPath: string): Promise<string[]> => {
  // Ensure migrations table exists before querying
  await ensureMigrationsTable(dbPath);

  const rows = await getAllQuery<{
    id: number;
    timestamp: string;
    created_at: string;
  }>(dbPath, 'SELECT * FROM migrations ORDER BY timestamp ASC');

  return rows.map((row) => row.timestamp);
};

/**
 * Removes a migration record from the database
 * @param dbPath Path to the database file
 * @param migrationTimestamp Migration timestamp
 */
export const removeMigrationRecord = async (
  dbPath: string,
  migrationTimestamp: string,
): Promise<void> => {
  await runQuery(dbPath, `DELETE FROM migrations WHERE timestamp = ?`, [migrationTimestamp]);
};
