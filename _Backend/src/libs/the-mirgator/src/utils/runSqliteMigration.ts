import path from 'path';
import fs from 'fs';
import { log } from './logger';
import { createSqliteDatabaseSchema } from './createSqliteDatabaseSchema';
import {
  getMigrationTimestamp,
  ensureMigrationsTable,
  isMigrationApplied,
  recordMigration,
  removeMigrationRecord,
} from '../migrationTracker';

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
 * @param dbPath Path to the database file
 * @param migrationPath Path to the migration file
 * @param updateSchema Whether to update schema file after migration
 * @returns Promise that resolves when migration is complete
 */
export const runSqliteMigration = async (
  direction: 'up' | 'down',
  dbPath: string,
  migrationPath: string,
  updateSchema: boolean = true,
): Promise<void> => {
  // Validate inputs
  validateMigrationInputs(dbPath, migrationPath);

  try {
    // Ensure migrations table exists
    await ensureMigrationsTable(dbPath);

    // Get migration timestamp from filename
    const timestamp = getMigrationTimestamp(migrationPath);

    // Check if migration should be skipped
    if (await shouldSkipMigration(dbPath, direction, timestamp)) {
      log(`Migration already ${direction === 'up' ? 'applied' : 'reverted'}, skipping`, 'info');
      return;
    }

    // Import and validate migration module
    const migration = await validateAndImportMigration(migrationPath);

    // Execute migration
    log(`Running migration ${direction}: ${path.basename(migrationPath)}`, 'info');

    if (direction === 'up') {
      await migration.up(dbPath);
    } else {
      await migration.down(dbPath);
    }

    // Update migration records
    await updateMigrationRecords(dbPath, direction, timestamp);

    // Update schema file if requested
    if (updateSchema) {
      await updateDatabaseSchema(dbPath);
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
const validateMigrationInputs = (dbPath: string, migrationPath: string): void => {
  if (!fs.existsSync(dbPath)) {
    throw new Error(`Database file not found: ${dbPath}`);
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
  dbPath: string,
  direction: 'up' | 'down',
  timestamp: string,
): Promise<boolean> => {
  const isApplied = await isMigrationApplied(dbPath, timestamp);
  return (direction === 'up' && isApplied) || (direction === 'down' && !isApplied);
};

/**
 * Updates migration tracking records in database
 * @param dbPath Path to the database file
 * @param direction Migration direction
 * @param timestamp Migration timestamp
 */
const updateMigrationRecords = async (
  dbPath: string,
  direction: 'up' | 'down',
  timestamp: string,
): Promise<void> => {
  if (direction === 'up') {
    await recordMigration(dbPath, timestamp);
    log(`Recorded migration: ${timestamp}`, 'info');
  } else {
    await removeMigrationRecord(dbPath, timestamp);
    log(`Removed migration record: ${timestamp}`, 'info');
  }
};

/**
 * Updates database schema file
 * @param dbPath Path to the database file
 */
const updateDatabaseSchema = async (dbPath: string): Promise<void> => {
  try {
    const schemaPath = await createSqliteDatabaseSchema(dbPath);
    log(`Schema file updated: ${schemaPath}`, 'success');
  } catch (schemaError) {
    log(`Warning: Failed to update schema file: ${schemaError}`, 'warning');
    // Continue execution even if schema update fails
  }
};
