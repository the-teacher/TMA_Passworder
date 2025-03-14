#!/usr/bin/env node

import path from 'path';
import fs from 'fs';

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
 * Runs a migration against a specified database
 * @param direction Migration direction ('up' or 'down')
 * @param dbPath Path to the database file
 * @param migrationPath Path to the migration file
 */
export const runMigration = async (
  direction: 'up' | 'down',
  dbPath: string,
  migrationPath: string,
): Promise<void> => {
  try {
    // Check if database file exists
    if (!fs.existsSync(dbPath)) {
      throw new Error(`Database file not found: ${dbPath}`);
    }

    // Check if migration file exists
    if (!fs.existsSync(migrationPath)) {
      throw new Error(`Migration file not found: ${migrationPath}`);
    }

    // Get the absolute path to the migration file
    const absoluteMigrationPath = path.resolve(migrationPath);

    // Import the migration file
    const migration = await import(absoluteMigrationPath);

    // Check if the migration has the requested method
    if (typeof migration[direction] !== 'function') {
      throw new Error(`Migration does not have a ${direction} method`);
    }

    // Run the migration
    console.log(`Running migration ${direction}: ${path.basename(migrationPath)}`);
    await migration[direction](dbPath);
    console.log(`Migration ${direction} completed successfully`);

    return;
  } catch (error) {
    console.error(`Migration failed: ${error instanceof Error ? error.message : String(error)}`);
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
} => {
  const args = process.argv.slice(2);
  const direction = (args[0] || 'up') as 'up' | 'down';
  const dbPath = args[1];
  const migrationPath = args[2];

  // Validate direction
  if (direction !== 'up' && direction !== 'down') {
    console.error(`Invalid direction: ${direction}. Must be 'up' or 'down'.`);
    return { direction: 'up', dbPath: undefined, migrationPath: undefined };
  }

  return { direction, dbPath, migrationPath };
};

/**
 * Shows help message
 */
const showHelp = (): void => {
  console.log(`
The Migrator - Migration Runner

Usage:
  node migrationRunner.js <direction> <dbPath> <migrationPath>

Arguments:
  direction      Migration direction (up or down)
  dbPath         Path to the database file
  migrationPath  Path to the migration file

Examples:
  node migrationRunner.js up ./db/sqlite/application/application.sqlite ./db/migrations/application/20250313125223_create_users_table.ts
  node migrationRunner.js down ./db/sqlite/application/application.sqlite ./db/migrations/application/20250313125223_create_users_table.ts
  `);
};

/**
 * Main function to run the migration
 */
const run = async (): Promise<void> => {
  // Parse command line arguments
  const { direction, dbPath, migrationPath } = parseArgs();

  // Show help if required arguments are missing
  if (!dbPath || !migrationPath) {
    showHelp();
    process.exit(1);
    return;
  }

  try {
    // Run the migration
    await runMigration(direction, dbPath, migrationPath);
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
