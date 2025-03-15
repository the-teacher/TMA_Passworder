#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { runMigration } from './migrationRunner';

/**
 * The Migrator - Migrations Runner
 *
 * This module provides functionality for running all migrations in a directory.
 *
 * Usage:
 *   node migrationsRunner.js <direction> <dbPath> <migrationsDir>
 *
 * Examples:
 *   node migrationsRunner.js up ./db/sqlite/application/application.sqlite ./db/migrations/application
 *   node migrationsRunner.js down ./db/sqlite/application/application.sqlite ./db/migrations/application
 *
 * @module the-migrator/migrationsRunner
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
 * Runs all migrations in a directory
 * @param direction Migration direction ('up' or 'down')
 * @param dbPath Path to the database file
 * @param migrationsDir Path to the migrations directory
 * @param updateSchema Whether to update the schema file after all migrations (default: true)
 */
export const runMigrations = async (
  direction: 'up' | 'down',
  dbPath: string,
  migrationsDir: string,
  updateSchema: boolean = true,
): Promise<void> => {
  try {
    // Validate inputs
    if (!fs.existsSync(dbPath)) {
      throw new Error(`Database file not found: ${dbPath}`);
    }

    if (!fs.existsSync(migrationsDir)) {
      throw new Error(`Migrations directory not found: ${migrationsDir}`);
    }

    // Get and filter migration files
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
      .sort();

    if (migrationFiles.length === 0) {
      log('No migration files found', 'info');
      return;
    }

    log(`Found ${migrationFiles.length} migration files`, 'info');

    // Process files in the appropriate order
    const filesToProcess = direction === 'down' ? [...migrationFiles].reverse() : migrationFiles;

    // Run migrations in sequence
    for (const file of filesToProcess) {
      const migrationPath = path.join(migrationsDir, file);
      log(`Running migration: ${file}`, 'info');
      await runMigration(direction, dbPath, migrationPath, updateSchema);
    }

    log('All migrations completed successfully', 'success');
  } catch (error) {
    log(`Migration Error: ${error instanceof Error ? error.message : String(error)}`, 'error');
    console.error(error);
    throw error;
  }
};

/**
 * Parses command line arguments
 */
export const parseArgs = (): {
  direction: 'up' | 'down';
  dbPath: string | undefined;
  migrationsDir: string | undefined;
  updateSchema: boolean;
} => {
  const args = process.argv.slice(2);
  const direction = (args[0] || 'up') as 'up' | 'down';
  const dbPath = args[1];
  const migrationsDir = args[2];
  // Fourth argument can be used to disable schema update
  const updateSchema = args[3] !== 'false';

  // Validate direction
  if (direction !== 'up' && direction !== 'down') {
    log(`Invalid direction: ${direction}. Must be 'up' or 'down'.`, 'error');
    return { direction: 'up', dbPath: undefined, migrationsDir: undefined, updateSchema };
  }

  return { direction, dbPath, migrationsDir, updateSchema };
};

/**
 * Shows help message
 */
const showHelp = (): void => {
  console.log(`
The Migrator - Migrations Runner

Usage:
  node migrationsRunner.js <direction> <dbPath> <migrationsDir> [updateSchema]

Arguments:
  direction      Migration direction (up or down)
  dbPath         Path to the database file
  migrationsDir  Path to the migrations directory
  updateSchema   Whether to update schema file (true/false, default: true)

Examples:
  node migrationsRunner.js up ./db/sqlite/application/application.sqlite ./db/migrations/application
  node migrationsRunner.js down ./db/sqlite/application/application.sqlite ./db/migrations/application false
  `);
};

/**
 * Main function to run all migrations
 */
const run = async (): Promise<void> => {
  // Parse command line arguments
  const { direction, dbPath, migrationsDir, updateSchema } = parseArgs();

  // Show help if required arguments are missing
  if (!dbPath || !migrationsDir) {
    showHelp();
    process.exit(1);
    return;
  }

  try {
    // Run all migrations
    await runMigrations(direction, dbPath, migrationsDir, updateSchema);
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
export {
  parseArgs as parseMigrationsArgs,
  showHelp as showMigrationsHelp,
  run as runMigrationsCommand,
};
