import path from 'path';
import { runSqlQuery, getAllQuery, getFirstQuery, type SQLiteDatabase } from '@libs/sqlite';

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
 * @param db Database instance
 * @returns Promise that resolves when the table is created or already exists
 */
export const ensureMigrationsTable = async (db: SQLiteDatabase): Promise<void> => {
  await runSqlQuery(
    db,
    `
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL UNIQUE,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `,
  );
};

/**
 * Records a migration in the database
 * @param db Database instance
 * @param migrationTimestamp Migration timestamp
 */
export const recordMigration = async (
  db: SQLiteDatabase,
  migrationTimestamp: string,
): Promise<void> => {
  await runSqlQuery(db, `INSERT INTO migrations (timestamp) VALUES (?)`, [migrationTimestamp]);
};

/**
 * Checks if a migration has been applied
 * @param db Database instance
 * @param migrationTimestamp Migration timestamp
 * @returns Whether the migration has been applied
 */
export const isMigrationApplied = async (
  db: SQLiteDatabase,
  migrationTimestamp: string,
): Promise<boolean> => {
  // Ensure migrations table exists before querying
  await ensureMigrationsTable(db);

  const row = await getFirstQuery<{ id: number }>(
    db,
    'SELECT id FROM migrations WHERE timestamp = ?',
    [migrationTimestamp],
  );

  return !!row;
};

/**
 * Gets all applied migrations from database
 * @param db Database instance
 * @returns Array of applied migrations
 */
export const getAppliedMigrations = async (db: SQLiteDatabase): Promise<string[]> => {
  // Ensure migrations table exists before querying
  await ensureMigrationsTable(db);

  const rows = await getAllQuery<{
    id: number;
    timestamp: string;
    created_at: string;
  }>(db, 'SELECT * FROM migrations ORDER BY timestamp ASC');

  return rows.map((row) => row.timestamp);
};

/**
 * Removes a migration record from the database
 * @param db Database instance
 * @param migrationTimestamp Migration timestamp
 */
export const removeMigrationRecord = async (
  db: SQLiteDatabase,
  migrationTimestamp: string,
): Promise<void> => {
  await runSqlQuery(db, `DELETE FROM migrations WHERE timestamp = ?`, [migrationTimestamp]);
};
