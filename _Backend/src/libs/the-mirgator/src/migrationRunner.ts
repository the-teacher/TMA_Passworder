#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { createDatabaseSchema } from './createDatabaseSchema';
import {
  getMigrationTimestamp,
  recordMigration,
  ensureMigrationsTable,
  isMigrationApplied,
  removeMigrationRecord,
} from './migrationTracker';

// TS Example: yarn tsx src/libs/the-mirgator/src/migrationRunner.ts up \
// ./db/sqlite/application/application.sqlite \
// ./db/migrations/application/20250313125223_create_users_table.ts

/**
 * The Migrator - Migration Runner
 *
 * This module provides functionality for running migrations against a database.
 *
 * Functions:
 * - runMigration: Executes a single migration file against a database
 * - validateMigrationInputs: Validates database and migration file paths
 * - validateAndImportMigration: Imports and validates a migration module
 * - shouldSkipMigration: Determines if a migration should be skipped
 * - updateMigrationRecords: Updates migration tracking records in database
 * - updateDatabaseSchema: Updates the schema file after migration
 * - parseArgs: Parses command line arguments
 * - showHelp: Displays help information for command line usage
 * - run: Main function that executes a single migration
 * - log: Enhanced logging function with different message types
 *
 * Usage:
 *   node migrationRunner.js <direction> <dbPath> <migrationPath>
 *
 * Examples:
 *   node migrationRunner.js up ./db/sqlite/application/application.sqlite ./db/migrations/application/20250313125223_create_users_table.ts
 *   node migrationRunner.js down ./db/sqlite/application/application.sqlite ./db/migrations/application/20250313125223_create_users_table.ts
 *
 * @module the-migrator/migrationRunner
 */

/**
 * Enhanced logging function
 * @param message Message to log
 * @param type Type of message ('info', 'error', 'success')
 */
const log = (message: string, type: 'info' | 'error' | 'success' = 'info'): void => {
  const prefix = '[Migrator]';

  switch (type) {
    case 'error':
      console.error(`${prefix} ❌ ${message}`);
      break;
    case 'success':
      console.log(`${prefix} ✅ ${message}`);
      break;
    default:
      console.log(`${prefix} ${message}`);
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
 * Validates and imports a migration file
 * @param migrationPath Path to the migration file
 * @param direction Migration direction ('up' or 'down')
 * @returns Imported migration module
 * @throws Error if validation fails
 */
const validateAndImportMigration = async (
  migrationPath: string,
  direction: 'up' | 'down',
): Promise<any> => {
  const absoluteMigrationPath = path.resolve(migrationPath);
  const migration = await import(absoluteMigrationPath);

  if (typeof migration[direction] !== 'function') {
    throw new Error(`Migration does not have a ${direction} method`);
  }

  return migration;
};

/**
 * Checks if a migration needs to be applied based on direction
 * @param dbPath Path to the database file
 * @param migrationPath Path to the migration file
 * @param direction Migration direction ('up' or 'down')
 * @returns Boolean indicating if migration should be skipped
 */
const shouldSkipMigration = async (
  dbPath: string,
  migrationPath: string,
  direction: 'up' | 'down',
): Promise<boolean> => {
  // For 'up' migrations, check if already applied
  if (direction === 'up') {
    const migrationTimestamp = getMigrationTimestamp(migrationPath);
    const alreadyApplied = await isMigrationApplied(dbPath, migrationTimestamp);

    if (alreadyApplied) {
      log(`Migration ${path.basename(migrationPath)} already applied`, 'info');
      return true;
    }
  }

  return false;
};

/**
 * Updates migration records based on direction
 * @param direction Migration direction ('up' or 'down')
 * @param dbPath Path to the database file
 * @param migrationTimestamp Timestamp of the migration
 */
const updateMigrationRecords = async (
  direction: 'up' | 'down',
  dbPath: string,
  migrationTimestamp: string,
): Promise<void> => {
  if (direction === 'up') {
    await recordMigration(dbPath, migrationTimestamp);
    log(`Migration recorded in migrations table: ${migrationTimestamp}`, 'success');
  } else {
    await removeMigrationRecord(dbPath, migrationTimestamp);
    log(`Migration record removed from migrations table: ${migrationTimestamp}`, 'success');
  }
};

/**
 * Updates database schema file
 * @param dbPath Path to the database file
 */
const updateDatabaseSchema = async (dbPath: string): Promise<void> => {
  try {
    const schemaPath = await createDatabaseSchema(dbPath);
    log(`Schema file updated: ${schemaPath}`, 'success');
  } catch (schemaError) {
    log(
      `Failed to update schema file: ${schemaError instanceof Error ? schemaError.message : String(schemaError)}`,
      'error',
    );
    // Don't fail the migration if schema update fails
  }
};

/**
 * Runs a migration against a specified database
 * @param direction Migration direction ('up' or 'down')
 * @param dbPath Path to the database file
 * @param migrationPath Path to the migration file
 * @param updateSchema Whether to update the schema file after migration (default: true)
 */
export const runMigration = async (
  direction: 'up' | 'down',
  dbPath: string,
  migrationPath: string,
  updateSchema: boolean = true,
): Promise<void> => {
  // Get migration timestamp
  const migrationTimestamp = getMigrationTimestamp(migrationPath);

  try {
    // Validate inputs
    validateMigrationInputs(dbPath, migrationPath);

    // Import and validate migration
    const migration = await validateAndImportMigration(migrationPath, direction);

    // Ensure migrations table exists
    await ensureMigrationsTable(dbPath);

    // Check if migration should be skipped
    if (await shouldSkipMigration(dbPath, migrationPath, direction)) {
      return;
    }

    log(`🟡 Migration ${migrationTimestamp} (${direction.toUpperCase()}): is running...`, 'info');
    await migration[direction](dbPath);
    log(`Migration ${migrationTimestamp} completed successfully`, 'success');

    // Update migration records
    await updateMigrationRecords(direction, dbPath, migrationTimestamp);

    // Update schema file if requested
    if (updateSchema) {
      await updateDatabaseSchema(dbPath);
    }
  } catch (error) {
    log(
      `Migration ${migrationTimestamp} failed: ${error instanceof Error ? error.message : String(error)}`,
      'error',
    );
    console.log(error);
    throw error;
  }
};

/**
 * Parses command line arguments
 */
const parseArgs = (): {
  direction: 'up' | 'down';
  dbPath: string | undefined;
  migrationPath: string | undefined;
  updateSchema: boolean;
} => {
  const args = process.argv.slice(2);
  const direction = (args[0] || 'up') as 'up' | 'down';
  const dbPath = args[1];
  const migrationPath = args[2];
  const updateSchema = args[3] !== 'false';

  if (direction !== 'up' && direction !== 'down') {
    log(`Invalid direction: ${direction}. Must be 'up' or 'down'.`, 'error');
    return { direction: 'up', dbPath: undefined, migrationPath: undefined, updateSchema };
  }

  return { direction, dbPath, migrationPath, updateSchema };
};

/**
 * Shows help message
 */
const showHelp = (): void => {
  console.log(`
The Migrator - Migration Runner

Usage:
  node migrationRunner.js <direction> <dbPath> <migrationPath> [updateSchema]

Arguments:
  direction      Migration direction (up or down)
  dbPath         Path to the database file
  migrationPath  Path to the migration file
  updateSchema   Whether to update schema file (true/false, default: true)

Examples:
  node migrationRunner.js up ./db/sqlite/application/application.sqlite ./db/migrations/application/20250313125223_create_users_table.ts
  node migrationRunner.js down ./db/sqlite/application/application.sqlite ./db/migrations/application/20250313125223_create_users_table.ts false
  `);
};

/**
 * Main function to run the migration
 */
const run = async (): Promise<void> => {
  const { direction, dbPath, migrationPath, updateSchema } = parseArgs();

  if (!dbPath || !migrationPath) {
    showHelp();
    process.exit(1);
  }

  try {
    await runMigration(direction, dbPath, migrationPath, updateSchema);
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

// Run the script if it's called directly
if (require.main === module) {
  run();
}

// Export for testing and programmatic use
export { parseArgs, showHelp, run };
