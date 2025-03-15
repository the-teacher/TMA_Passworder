import { runQuery } from '../../sqlite/runQuery';
import { getAllQuery, getFirstQuery } from '../../sqlite/getQuery';
import path from 'path';

/**
 * The Migrator - Migration Tracker
 *
 * This module provides functionality for tracking migrations in a SQLite database.
 * It creates and manages a migrations table to record which migrations have been applied.
 *
 * Functions:
 * - getMigrationTimestamp: Extracts timestamp from migration filename
 * - ensureMigrationsTable: Creates migrations tracking table if it doesn't exist
 * - recordMigration: Records a completed migration in the database
 * - isMigrationApplied: Checks if a migration has already been applied
 * - getAppliedMigrations: Retrieves all applied migrations from the database
 * - removeMigrationRecord: Removes a migration record from the database
 *
 * @module the-migrator/migrationTracker
 */

/**
 * Extracts the timestamp from a migration file name
 * @param migrationPath Path to the migration file
 * @returns Timestamp of the migration file
 */
export const getMigrationTimestamp = (migrationPath: string): string => {
  const migrationFileName = path.basename(migrationPath);
  const timestamp = migrationFileName.split('_')[0];
  return timestamp;
};

/**
 * Creates the migrations table in the database if it doesn't exist
 * @param dbPath Path to the SQLite database file
 * @returns Promise that resolves when the table is created or already exists
 */
export const ensureMigrationsTable = async (dbPath: string): Promise<void> => {
  await runQuery(
    dbPath,
    `
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `,
  );
};

/**
 * Records a completed migration in the migrations table
 * @param dbPath Path to the SQLite database file
 * @param migrationTimestamp Timestamp of the migration file that was executed
 * @returns Promise that resolves when the migration is recorded
 */
export const recordMigration = async (
  dbPath: string,
  migrationTimestamp: string,
): Promise<void> => {
  await runQuery(dbPath, `INSERT INTO migrations (timestamp) VALUES (?)`, [migrationTimestamp]);
};

/**
 * Checks if a migration has already been applied
 * @param dbPath Path to the SQLite database file
 * @param migrationPath Path to the migration file to check
 * @returns Promise that resolves to true if migration has been applied, false otherwise
 */
export const isMigrationApplied = async (
  dbPath: string,
  migrationTimestamp: string,
): Promise<boolean> => {
  const row = await getFirstQuery<{ id: number }>(
    dbPath,
    'SELECT id FROM migrations WHERE timestamp = ?',
    [migrationTimestamp],
  );

  return !!row; // Return true if row exists, false if undefined
};

/**
 * Gets all applied migrations from the database
 * @param dbPath Path to the SQLite database file
 * @returns Promise that resolves to an array of migration records
 */
export const getAppliedMigrations = async (
  dbPath: string,
): Promise<
  Array<{
    id: number;
    timestamp: string;
    created_at: string;
  }>
> => {
  const rows = await getAllQuery<{
    id: number;
    timestamp: string;
    created_at: string;
  }>(dbPath, 'SELECT * FROM migrations ORDER BY timestamp ASC');

  return rows;
};

/**
 * Removes a migration record from the migrations table
 * @param dbPath Path to the SQLite database file
 * @param migrationTimestamp Timestamp of the migration to remove
 * @returns Promise that resolves when the migration record is removed
 */
export const removeMigrationRecord = async (
  dbPath: string,
  migrationTimestamp: string,
): Promise<void> => {
  await runQuery(dbPath, `DELETE FROM migrations WHERE timestamp = ?`, [migrationTimestamp]);
};
