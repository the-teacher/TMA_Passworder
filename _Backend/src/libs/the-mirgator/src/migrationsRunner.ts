#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { runMigration } from './migrationRunner';
import {
  getMigrationTimestamp,
  isMigrationApplied,
  getAppliedMigrations,
} from './migrationTracker';

/**
 * The Migrator - Migrations Runner
 *
 * This module provides functionality for running all migrations in a directory.
 *
 * Functions:
 * - runMigrations: Runs all migrations in a directory in sequence
 * - parseArgs: Parses command line arguments for migration runner
 * - showHelp: Displays help information for command line usage
 * - run: Main function that executes the migration process
 * - log: Enhanced logging function with different message types
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
 * Validates migration inputs
 * @param dbPath Path to the database file
 * @param migrationsDir Path to the migrations directory
 * @throws Error if validation fails
 */
const validateMigrationsInputs = (dbPath: string, migrationsDir: string): void => {
  if (!fs.existsSync(dbPath)) {
    throw new Error(`Database file not found: ${dbPath}`);
  }

  if (!fs.existsSync(migrationsDir)) {
    throw new Error(`Migrations directory not found: ${migrationsDir}`);
  }
};

/**
 * Gets migration files from the migrations directory
 * @param migrationsDir Path to the migrations directory
 * @param direction Migration direction ('up' or 'down')
 * @returns Array of migration files in the correct order
 */
const getMigrationFiles = (migrationsDir: string): string[] => {
  // Get and filter migration files
  return fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
    .sort();
};

/**
 * Gets migration files for 'down' direction based on step parameter and applied migrations
 * @param migrationFiles Array of all migration files
 * @param dbPath Path to the database file
 * @param step Number of migrations to run down (optional)
 * @returns Promise that resolves to array of migration files to run down in correct order
 */
const getDownMigrations = async (
  migrationFiles: string[],
  dbPath: string,
  step?: number,
): Promise<string[]> => {
  // Reverse the files for 'down' direction
  const reversedFiles = [...migrationFiles].reverse();

  // If no step provided, show message and return empty array
  if (step === undefined || step <= 0) {
    log('For "down" migrations, you must specify a STEP parameter (e.g., STEP=1)', 'error');
    log('This is a safety measure to prevent accidentally rolling back all migrations', 'error');
    return [];
  }

  // Get all applied migrations from the database
  const appliedMigrations = await getAppliedMigrations(dbPath);
  const appliedTimestamps = appliedMigrations.map((m) => m.timestamp);

  // Filter reversed files to only include those that have been applied
  const appliedFiles = reversedFiles.filter((file) => {
    const timestamp = getMigrationTimestamp(file);
    return appliedTimestamps.includes(timestamp);
  });

  log(`Found ${appliedFiles.length} applied migrations that can be rolled back`, 'info');

  // Limit by step parameter
  return appliedFiles.slice(0, step);
};

/**
 * Parses command line arguments
 */
export const parseArgs = (): {
  direction: 'up' | 'down';
  dbPath: string | undefined;
  migrationsDir: string | undefined;
  updateSchema: boolean;
  step?: number;
} => {
  const args = process.argv.slice(2);
  const direction = (args[0] || 'up') as 'up' | 'down';
  const dbPath = args[1];
  const migrationsDir = args[2];
  // Fourth argument can be used to disable schema update
  const updateSchema = args[3] !== 'false';

  // Parse STEP parameter from environment or command line
  let step: number | undefined;
  const stepArg = process.env.STEP || args.find((arg) => arg.startsWith('STEP='))?.split('=')[1];
  if (stepArg) {
    step = parseInt(stepArg, 10);
    if (isNaN(step) || step <= 0) {
      log('STEP parameter must be a positive integer', 'error');
      step = undefined;
    }
  }

  // Validate direction
  if (direction !== 'up' && direction !== 'down') {
    log(`Invalid direction: ${direction}. Must be 'up' or 'down'.`, 'error');
    return { direction: 'up', dbPath: undefined, migrationsDir: undefined, updateSchema, step };
  }

  return { direction, dbPath, migrationsDir, updateSchema, step };
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
 * Runs all migrations in a directory
 * @param direction Migration direction ('up' or 'down')
 * @param dbPath Path to the database file
 * @param migrationsDir Path to the migrations directory
 * @param updateSchema Whether to update the schema file after all migrations (default: true)
 * @param step Number of migrations to run (for 'down' direction)
 */
export const runMigrations = async (
  direction: 'up' | 'down',
  dbPath: string,
  migrationsDir: string,
  updateSchema: boolean = true,
  step?: number,
): Promise<void> => {
  // Validate inputs
  validateMigrationsInputs(dbPath, migrationsDir);

  // Get migration files
  let migrationFiles = getMigrationFiles(migrationsDir);

  // Process files in the appropriate order
  if (direction === 'down') {
    migrationFiles = await getDownMigrations(migrationFiles, dbPath, step);
  }

  if (migrationFiles.length === 0) {
    log('No migration files found to process', 'info');
    return;
  }

  log(`Found ${migrationFiles.length} migration files to process`, 'info');

  // Run migrations in sequence
  for (const file of migrationFiles) {
    const migrationPath = path.join(migrationsDir, file);
    log(`Running migration: ${file}`, 'info');
    await runMigration(direction, dbPath, migrationPath, updateSchema);
  }

  log('All migrations completed successfully', 'success');
};

/**
 * Main function to run all migrations
 */
const run = async (): Promise<void> => {
  // Parse command line arguments
  const { direction, dbPath, migrationsDir, updateSchema, step } = parseArgs();

  // Show help if required arguments are missing
  if (!dbPath || !migrationsDir) {
    showHelp();
    process.exit(1);
    return;
  }

  try {
    // Run all migrations
    await runMigrations(direction, dbPath, migrationsDir, updateSchema, step);
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
