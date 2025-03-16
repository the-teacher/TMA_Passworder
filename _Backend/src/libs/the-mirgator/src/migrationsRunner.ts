#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { runMigration } from './migrationRunner';
import { getMigrationTimestamp, getAppliedMigrations } from './migrationTracker';
import { log } from './migrationLogger';
import { getDatabaseRootDir } from './databasePaths';

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
 *
 * Usage:
 *   node migrationsRunner.js <direction> <dbName> [migrationsDir] [updateSchema] [--force]
 *
 * Examples:
 *   node migrationsRunner.js up application
 *   node migrationsRunner.js down application/database
 *   node migrationsRunner.js up application/database ./src/db/migrations/application
 *
 * @module the-migrator/migrationsRunner
 */

// Configuration constants
const COUNTDOWN_SECONDS = 10;
const DEFAULT_MIGRATIONS_DIR = './src/db/migrations';

/**
 * Extracts the base name from a path-like database name
 * @param dbName Database name (may include path separators)
 * @returns The base name (last part of the path)
 */
const extractBaseName = (dbName: string): string => {
  if (dbName.includes('/') || dbName.includes('\\')) {
    const parts = dbName.split(/[\/\\]/);
    return parts[0]; // Return the first part as the base name
  }
  return dbName;
};

/**
 * Resolves the full database path based on dbName
 * @param dbName Database name (may include path separators)
 * @returns Full path to the database file
 */
const resolveDatabasePath = (dbName: string): string => {
  // Check if dbName contains path separators
  const hasPathSeparators = dbName.includes('/') || dbName.includes('\\');

  if (hasPathSeparators) {
    // If dbName contains path separators, split it into directory and filename
    const dbNameParts = dbName.split(/[\/\\]/);
    const fileName = `${dbNameParts.pop()}.sqlite`; // Last part becomes the filename
    const subDirs = dbNameParts.join('/'); // Rest becomes subdirectories

    // Combine with base directory
    return path.join(process.cwd(), getDatabaseRootDir(), subDirs, fileName);
  } else {
    // Simple case - no path separators
    const dbFileName = dbName.endsWith('.sqlite') ? dbName : `${dbName}.sqlite`;
    return path.join(process.cwd(), getDatabaseRootDir(), dbFileName);
  }
};

/**
 * Resolves the migrations directory path based on dbName
 * @param dbName Database name (may include path separators)
 * @param customDir Optional custom migrations directory
 * @returns Full path to the migrations directory
 */
const resolveMigrationsDir = (dbName: string, customDir?: string): string => {
  if (customDir) {
    return path.resolve(customDir);
  }

  // Extract the base name for migrations directory
  const baseName = extractBaseName(dbName);
  return path.join(process.cwd(), DEFAULT_MIGRATIONS_DIR, baseName);
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
 * Waits for a countdown before proceeding with potentially destructive operations
 * @param seconds Number of seconds to wait
 */
const waitForCountdown = async (seconds: number): Promise<void> => {
  log('To cancel, press Ctrl+C now.', 'warning');
  log(`Rollback will proceed in ${seconds} seconds...`, 'warning');

  // Wait for countdown seconds with countdown
  for (let i = seconds; i > 0; i--) {
    process.stdout.write(`\r${i} seconds remaining...`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  process.stdout.write('\n');
};

/**
 * Parses command line arguments
 * @returns Object containing parsed arguments
 */
const parseArgs = (): {
  direction: 'up' | 'down';
  dbName: string | undefined;
  migrationsDir: string | undefined;
  updateSchema: boolean;
  step?: number;
  force: boolean;
} => {
  const args = process.argv.slice(2);
  const direction = (args[0] || 'up') as 'up' | 'down';
  const dbName = args[1];
  const customMigrationsDir = args[2];
  const updateSchema = args[3] !== 'false';
  const force = args.includes('--force');

  // Parse STEP parameter from environment or command line
  let step: number | undefined;
  const stepEnv = process.env.STEP;
  if (stepEnv) {
    step = parseInt(stepEnv, 10);
  }

  // Look for STEP=n in command line arguments
  for (const arg of args) {
    if (arg.startsWith('STEP=')) {
      const stepValue = arg.split('=')[1];
      step = parseInt(stepValue, 10);
      break;
    }
  }

  if (direction !== 'up' && direction !== 'down') {
    log(`Invalid direction: ${direction}. Must be 'up' or 'down'.`, 'error');
    return {
      direction: 'up',
      dbName: undefined,
      migrationsDir: undefined,
      updateSchema,
      step,
      force,
    };
  }

  // Resolve migrations directory if dbName is provided
  let migrationsDir: string | undefined;
  if (dbName) {
    migrationsDir = resolveMigrationsDir(dbName, customMigrationsDir);
  }

  return { direction, dbName, migrationsDir, updateSchema, step, force };
};

/**
 * Shows help message
 */
const showHelp = (): void => {
  console.log(`
The Migrator - Migrations Runner

Usage:
  node migrationsRunner.js <direction> <dbName> [migrationsDir] [updateSchema] [--force]

Arguments:
  direction      Migration direction (up or down)
  dbName         Name of the database (without .sqlite extension)
                 Can include path separators (e.g., application/database)
  migrationsDir  Path to the migrations directory (default: ./src/db/migrations/<baseName>)
                 Where <baseName> is the first part of dbName before any path separator
  updateSchema   Whether to update schema file (true/false, default: true)
  --force        Skip confirmation countdown for down migrations

Environment:
  NODE_ENV       Environment name (default: "development")
                 For "test" environment, databases are in tmp/sqlite/test
                 For other environments, databases are in data/sqlite/{NODE_ENV}
  STEP           Number of migrations to run down (required for down migrations)

Examples:
  node migrationsRunner.js up application
  node migrationsRunner.js down application/database
  NODE_ENV=production node migrationsRunner.js up application/database
  node migrationsRunner.js down application/database false --force STEP=2
  `);
};

/**
 * Runs all migrations in a directory
 * @param direction Migration direction ('up' or 'down')
 * @param dbName Database name
 * @param migrationsDir Path to the migrations directory
 * @param updateSchema Whether to update the schema file after all migrations (default: true)
 * @param step Number of migrations to run (for 'down' direction)
 * @param force Whether to skip confirmation countdown (default: false)
 */
export const runMigrations = async (
  direction: 'up' | 'down',
  dbName: string,
  migrationsDir?: string,
  updateSchema: boolean = true,
  step?: number,
  force: boolean = false,
): Promise<void> => {
  // Resolve database path and migrations directory
  const dbPath = resolveDatabasePath(dbName);
  const resolvedMigrationsDir = migrationsDir || resolveMigrationsDir(dbName);

  log(`Database path: ${dbPath}`, 'info');
  log(`Migrations directory: ${resolvedMigrationsDir}`, 'info');

  // Validate inputs
  validateMigrationsInputs(dbPath, resolvedMigrationsDir);

  // Get migration files
  let migrationFiles = getMigrationFiles(resolvedMigrationsDir);

  // Process files in the appropriate order
  if (direction === 'down') {
    migrationFiles = await getDownMigrations(migrationFiles, dbPath, step);
  }

  if (migrationFiles.length === 0) {
    log('No migration files found to process', 'info');
    return;
  }

  log(`Found ${migrationFiles.length} migration files to process`, 'info');

  // For down migrations, show a countdown to allow cancellation
  if (direction === 'down' && migrationFiles.length > 0 && !force) {
    log(`WARNING: You are about to roll back ${migrationFiles.length} migrations!`, 'warning');
    await waitForCountdown(COUNTDOWN_SECONDS);
  }

  // Run migrations in sequence
  for (const file of migrationFiles) {
    const migrationPath = path.join(resolvedMigrationsDir, file);
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
  const { direction, dbName, migrationsDir, updateSchema, step, force } = parseArgs();

  // Show help if required arguments are missing
  if (!dbName) {
    showHelp();
    process.exit(1);
    return;
  }

  try {
    // Run all migrations
    await runMigrations(direction, dbName, migrationsDir, updateSchema, step, force);
    process.exit(0);
  } catch (error) {
    console.error(error);
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
