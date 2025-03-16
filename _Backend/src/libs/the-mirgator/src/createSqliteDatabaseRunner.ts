#!/usr/bin/env node

// TS Example: yarn tsx src/libs/the-mirgator/src/createSqliteDatabaseRunner.ts users

import { createSqliteDatabase } from './createSqliteDatabase';
import path from 'path';

/**
 * The Migrator - SQLite Database Runner
 *
 * This module provides a command-line interface for creating SQLite database files.
 *
 * Usage:
 *   node createSqliteDatabaseRunner.js <dbName> [scope] [directory]
 *
 * Examples:
 *   node createSqliteDatabaseRunner.js users
 *   node createSqliteDatabaseRunner.js products tenant
 *   node createSqliteDatabaseRunner.js analytics reporting ./src/data/sqlite
 *
 * @module the-migrator/createSqliteDatabaseRunner
 */

// Default values
const DEFAULT_DB_ROOT_DIR = 'data/sqlite';
const DEFAULT_DIRECTORY = path.join(process.cwd(), DEFAULT_DB_ROOT_DIR);
const DEFAULT_SCOPE = 'application';

/**
 * Parses command line arguments
 * @returns Object containing parsed arguments
 */
const parseArgs = (): {
  dbName: string | undefined;
  scope: string;
  directory: string;
} => {
  // Get command line arguments (skip first two: node and script path)
  const args = process.argv.slice(2);

  // Parse arguments
  const dbName = args[0];
  let scope = args[1] || DEFAULT_SCOPE;
  let directory = args[2] || DEFAULT_DIRECTORY;

  return { dbName, scope, directory };
};

/**
 * Shows help message
 */
const showHelp = (): void => {
  console.log(`
The Migrator - SQLite Database Creator

Usage:
  node createSqliteDatabaseRunner.js <dbName> [scope] [directory]

Arguments:
  dbName     Name of the database to create (required)
  scope      Database scope (default: "application")
  directory  Directory to save the database (default: ./db/sqlite)

Examples:
  node createSqliteDatabaseRunner.js users
  node createSqliteDatabaseRunner.js products tenant
  node createSqliteDatabaseRunner.js analytics reporting ./src/data/sqlite
  `);
};

/**
 * Main function to run the database creator
 */
const run = async (): Promise<void> => {
  // Parse command line arguments
  const { dbName, scope, directory } = parseArgs();

  // Show help if no database name provided
  if (!dbName) {
    showHelp();
    process.exit(1);
    return; // Add this return to prevent further execution
  }

  try {
    // Create database file
    const dbPath = await createSqliteDatabase(dbName, scope, directory);
    console.log(`Successfully created SQLite database: ${dbPath}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating SQLite database:');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

// Run the script if it's called directly
if (require.main === module) {
  run();
}

// Export for testing
export { parseArgs, showHelp, run };
