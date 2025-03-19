import path from 'path';
import fs from 'fs';
import { log } from './logger';
import { updateDatabaseSchema } from './updateSqlSchema';

import {
  getMigrationTimestamp,
  ensureMigrationsTable,
  isMigrationApplied,
  recordMigration,
  removeMigrationRecord,
} from './migrationTracker';
import { type SQLiteDatabase } from '@libs/sqlite';
/**
 * The Migrator - SQLite Migration Runner
 *
 * This module provides core functionality for running migrations against a SQLite database.
 *
 * @module the-migrator/utils/runSqliteMigration
 */

/**
 * Migration module interface
 */
export type MigrationModule = {
  up: (db: any) => Promise<void>;
  down: (db: any) => Promise<void>;
};

/**
 * Executes a single migration file against a database
 * @param direction Migration direction ('up' or 'down')
 * @param db Database instance
 * @param migrationPath Path to the migration file
 * @param updateSchema Whether to update schema file after migration
 * @returns Promise that resolves when migration is complete
 */
export const runSqliteMigration = async (
  direction: 'up' | 'down',
  db: SQLiteDatabase,
  migrationPath: string,
  updateSchema: boolean = false,
): Promise<void> => {
  // Validate inputs
  validateMigrationInputs(db, migrationPath);

  try {
    // Ensure migrations table exists
    await ensureMigrationsTable(db);

    // Get migration timestamp from filename
    const timestamp = getMigrationTimestamp(migrationPath);

    // Check if migration should be skipped
    if (await shouldSkipMigration(db, direction, timestamp)) {
      log(`Migration already ${direction === 'up' ? 'applied' : 'reverted'}, skipping`, 'info');
      return;
    }

    // Import and validate migration module
    const migration = await validateAndImportMigration(migrationPath);

    // Execute migration
    log(`Running migration ${direction}: ${path.basename(migrationPath)}`, 'info');

    if (direction === 'up') {
      await migration.up(db);
    } else {
      await migration.down(db);
    }

    // Update migration records
    await updateMigrationRecords(db, direction, timestamp);

    // Update schema file if requested
    if (updateSchema) {
      await updateDatabaseSchema(db);
    }

    log(`Migration ${direction} completed successfully`, 'success');
  } catch (error) {
    log(`Migration ${direction} failed: ${error}`, 'error');
    throw error;
  }
};

/**
 * Validates migration inputs
 * @param dbPath Path to the database file
 * @param migrationPath Path to the migration file
 * @throws Error if validation fails
 */
const validateMigrationInputs = (db: SQLiteDatabase, migrationPath: string): void => {
  if (!db) {
    throw new Error(`Database not provided`);
  }

  if (!fs.existsSync(migrationPath)) {
    throw new Error(`Migration file not found: ${migrationPath}`);
  }
};

/**
 * Imports and validates a migration module
 * @param migrationPath Path to the migration file
 * @returns Imported migration module
 * @throws Error if validation fails
 */
const validateAndImportMigration = async (migrationPath: string): Promise<MigrationModule> => {
  try {
    // Import migration module
    const migration = await import(migrationPath);

    // Validate migration module
    if (typeof migration.up !== 'function') {
      throw new Error(`Migration is missing 'up' function: ${migrationPath}`);
    }

    if (typeof migration.down !== 'function') {
      throw new Error(`Migration is missing 'down' function: ${migrationPath}`);
    }

    return migration;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Cannot find module')) {
      throw new Error(`Failed to import migration: ${migrationPath}`);
    }
    throw error;
  }
};

/**
 * Determines if a migration should be skipped
 * @param dbPath Path to the database file
 * @param direction Migration direction
 * @param timestamp Migration timestamp
 * @returns Whether migration should be skipped
 */
const shouldSkipMigration = async (
  db: SQLiteDatabase,
  direction: 'up' | 'down',
  timestamp: string,
): Promise<boolean> => {
  const isApplied = await isMigrationApplied(db, timestamp);
  return (direction === 'up' && isApplied) || (direction === 'down' && !isApplied);
};

/**
 * Updates migration tracking records in database
 * @param dbPath Path to the database file
 * @param direction Migration direction
 * @param timestamp Migration timestamp
 */
const updateMigrationRecords = async (
  db: SQLiteDatabase,
  direction: 'up' | 'down',
  timestamp: string,
): Promise<void> => {
  if (direction === 'up') {
    await recordMigration(db, timestamp);
    log(`Recorded migration: ${timestamp}`, 'info');
  } else {
    await removeMigrationRecord(db, timestamp);
    log(`Removed migration record: ${timestamp}`, 'info');
  }
};
