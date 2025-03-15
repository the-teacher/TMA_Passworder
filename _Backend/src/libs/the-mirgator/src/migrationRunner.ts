#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { createDatabaseSchema } from './createDatabaseSchema';
import { getMigrationTimestamp, recordMigration } from './migrationTracker';
// TS Example: yarn tsx src/libs/the-mirgator/src/migrationRunner.ts up \
// ./db/sqlite/application/application.sqlite \
// ./db/migrations/application/20250313125223_create_users_table.ts

/**
 * The Migrator - Migration Runner
 *
 * This module provides functionality for running migrations against a database.
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
  try {
    // Validate inputs
    if (!fs.existsSync(dbPath)) {
      throw new Error(`Database file not found: ${dbPath}`);
    }

    if (!fs.existsSync(migrationPath)) {
      throw new Error(`Migration file not found: ${migrationPath}`);
    }

    // Import and run migration
    const absoluteMigrationPath = path.resolve(migrationPath);
    const migration = await import(absoluteMigrationPath);

    if (typeof migration[direction] !== 'function') {
      throw new Error(`Migration does not have a ${direction} method`);
    }

    log(`Running migration ${direction.toUpperCase()}: ${path.basename(migrationPath)}`, 'info');
    await migration[direction](dbPath);
    log(`Migration completed successfully`, 'success');

    // Record migration in migrations table
    const migrationTimestamp = getMigrationTimestamp(migrationPath);
    await recordMigration(dbPath, migrationTimestamp);

    // Update schema file if requested
    if (updateSchema) {
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
    }
  } catch (error) {
    log(`Migration failed: ${error instanceof Error ? error.message : String(error)}`, 'error');
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
