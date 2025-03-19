#!/usr/bin/env node

import { log } from '../utils/logger';
import { runSqliteMigration } from '../utils/runSqliteMigration';

/**
 * The Migrator - Migration Runner CLI
 *
 * This module provides a command-line interface for running a single migration.
 *
 * Usage:
 *   node migrationRunner.js <direction> <dbPath> <migrationPath> [updateSchema]
 *
 * Examples:
 *   node migrationRunner.js up ./data/sqlite/application/application.sqlite ./db/migrations/application/20250313125223_create_users_table.ts
 *   node migrationRunner.js down ./data/sqlite/application/application.sqlite ./db/migrations/application/20250313125223_create_users_table.ts false
 *
 * @module the-migrator/migrationRunner
 */

/**
 * Parses command line arguments
 * @returns Object containing parsed arguments
 */
export const parseArgs = (): {
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
export const showHelp = (): void => {
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
  node migrationRunner.js up ./data/sqlite/application/application.sqlite ./db/migrations/application/20250313125223_create_users_table.ts
  node migrationRunner.js down ./data/sqlite/application/application.sqlite ./db/migrations/application/20250313125223_create_users_table.ts false
  `);
};

/**
 * Main function to run the migration
 */
export const run = async (): Promise<void> => {
  const { direction, dbPath, migrationPath, updateSchema } = parseArgs();

  if (!dbPath || !migrationPath) {
    showHelp();
    process.exit(1);
  }

  try {
    await runSqliteMigration(direction, dbPath, migrationPath, updateSchema);
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

// Run the script if it's called directly
if (require.main === module) {
  run();
}
