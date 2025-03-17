#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { log } from './utils/logger';
import { getDatabaseRootDir } from './utils/databasePaths';
import { runSqliteMigration } from './utils/runSqliteMigration';
import { resolveDatabasePath } from './utils/databasePaths';
import { getMigrationTimestamp, getAppliedMigrations } from './migrationTracker';

/**
 * The Migrator - Migrations Runner CLI
 *
 * This module provides a command-line interface for running all migrations in a directory.
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

/**
 * Runs all migrations in a directory in sequence
 * @param direction Migration direction ('up' or 'down')
 * @param dbName Database name or path
 * @param migrationsDir Directory containing migration files
 * @param updateSchema Whether to update schema file after each migration
 * @param step Number of migrations to run (optional)
 * @param force Whether to force running migrations even if already applied/reverted
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
  const dbPath = resolveDatabasePath(dbName) as string;
  const resolvedMigrationsDir = resolveMigrationsDir(dbName, migrationsDir);

  // Check if migrations directory exists
  if (!fs.existsSync(resolvedMigrationsDir)) {
    throw new Error(`Migrations directory not found: ${resolvedMigrationsDir}`);
  }

  // Get all migration files
  const migrationFiles = getMigrationFiles(resolvedMigrationsDir);

  if (migrationFiles.length === 0) {
    log(`No migration files found in ${resolvedMigrationsDir}`, 'warning');
    return;
  }

  // Sort migration files
  sortMigrationFiles(migrationFiles, direction);

  // Limit number of migrations if step is specified
  const migrationsToRun = step ? migrationFiles.slice(0, step) : migrationFiles;

  // Get applied migrations
  const { getDatabase } = await import('../sqlite/getDatabase');
  const db = getDatabase(dbPath);
  const appliedMigrations = await getAppliedMigrations(db);
  db.close();

  // Filter migrations based on direction and applied status
  const filteredMigrations = filterMigrations(migrationsToRun, appliedMigrations, direction, force);

  if (filteredMigrations.length === 0) {
    log(`No ${direction} migrations to run`, 'info');
    return;
  }

  log(`Running ${filteredMigrations.length} ${direction} migrations`, 'info');

  // Run each migration in sequence
  for (const migrationFile of filteredMigrations) {
    const migrationPath = path.join(resolvedMigrationsDir, migrationFile);
    await runSqliteMigration(direction, dbPath, migrationPath, updateSchema);
  }

  log(`All ${direction} migrations completed successfully`, 'success');
};

/**
 * Resolves migrations directory based on database name
 * @param dbName Database name or path
 * @param migrationsDir Optional migrations directory
 * @returns Resolved migrations directory path
 */
const resolveMigrationsDir = (dbName: string, migrationsDir?: string): string => {
  if (migrationsDir) {
    return path.resolve(migrationsDir);
  }

  // Extract database name from path-like name
  const dbNameParts = dbName.split(/[\/\\]/);
  const baseName = dbNameParts[dbNameParts.length - 1];

  // Default migrations directory is ./db/migrations/{dbName}
  return path.resolve('db', 'migrations', baseName);
};

/**
 * Gets all migration files from a directory
 * @param migrationsDir Migrations directory
 * @returns Array of migration filenames
 */
const getMigrationFiles = (migrationsDir: string): string[] => {
  return fs.readdirSync(migrationsDir).filter((file) => {
    // Filter for TypeScript or JavaScript files with timestamp prefix
    return (file.endsWith('.ts') || file.endsWith('.js')) && /^\d{14}_/.test(file);
  });
};

/**
 * Sorts migration files based on direction
 * @param migrationFiles Array of migration filenames
 * @param direction Migration direction
 */
const sortMigrationFiles = (migrationFiles: string[], direction: 'up' | 'down'): void => {
  migrationFiles.sort((a, b) => {
    const timestampA = getMigrationTimestamp(a);
    const timestampB = getMigrationTimestamp(b);

    // For 'up', sort ascending; for 'down', sort descending
    return direction === 'up'
      ? timestampA.localeCompare(timestampB)
      : timestampB.localeCompare(timestampA);
  });
};

/**
 * Filters migrations based on direction and applied status
 * @param migrationFiles Array of migration filenames
 * @param appliedMigrations Array of applied migration timestamps
 * @param direction Migration direction
 * @param force Whether to force running migrations
 * @returns Filtered array of migration filenames
 */
const filterMigrations = (
  migrationFiles: string[],
  appliedMigrations: string[],
  direction: 'up' | 'down',
  force: boolean,
): string[] => {
  if (force) {
    return migrationFiles;
  }

  return migrationFiles.filter((file) => {
    const timestamp = getMigrationTimestamp(file);
    const isApplied = appliedMigrations.includes(timestamp);

    // For 'up', include if not applied; for 'down', include if applied
    return direction === 'up' ? !isApplied : isApplied;
  });
};

/**
 * Parses command line arguments
 * @returns Object containing parsed arguments
 */
export const parseArgs = (): {
  direction: 'up' | 'down';
  dbName: string | undefined;
  migrationsDir: string | undefined;
  updateSchema: boolean;
  step: number | undefined;
  force: boolean;
} => {
  const args = process.argv.slice(2);
  const direction = (args[0] || 'up') as 'up' | 'down';
  const dbName = args[1];
  let migrationsDir = args[2];
  let updateSchema = true;
  let step: number | undefined;
  let force = false;

  // Parse remaining arguments
  for (let i = 3; i < args.length; i++) {
    const arg = args[i];

    if (arg === 'false' || arg === '--no-schema') {
      updateSchema = false;
    } else if (arg === '--force' || arg === '-f') {
      force = true;
    } else if (arg.startsWith('--step=')) {
      const stepValue = parseInt(arg.split('=')[1], 10);
      if (!isNaN(stepValue) && stepValue > 0) {
        step = stepValue;
      }
    }
  }

  if (direction !== 'up' && direction !== 'down') {
    log(`Invalid direction: ${direction}. Must be 'up' or 'down'.`, 'error');
    return { direction: 'up', dbName: undefined, migrationsDir, updateSchema, step, force };
  }

  return { direction, dbName, migrationsDir, updateSchema, step, force };
};

/**
 * Shows help message
 */
export const showHelp = (): void => {
  console.log(`
The Migrator - Migrations Runner

Usage:
  node migrationsRunner.js <direction> <dbName> [migrationsDir] [options]

Arguments:
  direction      Migration direction (up or down)
  dbName         Name of the database or path-like name (e.g., 'application' or 'tenant/users')
  migrationsDir  Directory containing migration files (default: ./db/migrations/{dbName})

Options:
  false, --no-schema  Don't update schema file after migrations
  --step=N            Run only N migrations
  --force, -f         Force running migrations even if already applied/reverted

Examples:
  node migrationsRunner.js up application
  node migrationsRunner.js down application/database
  node migrationsRunner.js up application --step=5
  node migrationsRunner.js up application/database ./src/db/migrations/application --force
  `);
};

/**
 * Main function to run the migrations
 */
export const run = async (): Promise<void> => {
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
