#!/usr/bin/env node

import { resolveDatabasePath } from '../utils/databasePaths';
import { dropSqliteDatabase } from '../utils/dropSqliteDatabase';
/**
 * The Migrator - Database Drop Utility
 *
 * This module provides functionality for safely dropping SQLite databases.
 * It includes a confirmation prompt and countdown timer before deletion.
 *
 * Functions:
 * - dropSqliteDatabase: Deletes a SQLite database file or directory after confirmation
 * - parseArgs: Parses command line arguments
 * - showHelp: Displays help information
 * - run: Main function that executes the database drop process
 *
 * Usage:
 *   node dropDatabase.js <dbPath> [--force]
 *   node dropDatabase.js <dbName> [--force]
 *
 * Examples:
 *   node dropDatabase.js ./data/sqlite/application/users.sqlite
 *   node dropDatabase.js application
 *   node dropDatabase.js application/database
 *   node dropDatabase.js ./db/sqlite/tenant --force
 *
 * TS EXAMPLE:
 *   tsx src/libs/the-mirgator/src/dropDatabase.ts ./data/sqlite/application/application.sqlite
 *   tsx src/libs/the-mirgator/src/dropDatabase.ts application
 *   tsx src/libs/the-mirgator/src/dropDatabase.ts application/database
 *
 * @module the-migrator/dropDatabase
 */

/**
 * Parses command line arguments
 */
export const parseArgs = (): {
  dbPath: string | undefined;
  force: boolean;
} => {
  const args = process.argv.slice(2);
  const force = args.includes('--force');

  // Remove --force from args if present
  const cleanArgs = args.filter((arg) => arg !== '--force');

  let dbPath: string | undefined;

  if (cleanArgs.length >= 1) {
    const dbNameOrPath = cleanArgs[0];
    dbPath = resolveDatabasePath(dbNameOrPath) as string;
  }

  return { dbPath, force };
};

/**
 * Shows help message
 */
const showHelp = (): void => {
  console.log(`
The Migrator - Database Drop Utility

Usage:
  node dropDatabase.js <dbPath> [--force]
  node dropDatabase.js <dbName> [--force]

Arguments:
  dbPath     Full path to the database file or directory
  dbName     Name of the database (without .sqlite extension)
             Can include path separators (e.g., application/database)
  --force    Skip confirmation countdown

Environment:
  NODE_ENV   Environment name (default: "development")
             For "test" environment, databases are in tmp/sqlite/test
             For other environments, databases are in data/sqlite/{NODE_ENV}

Examples:
  node dropDatabase.js ./data/sqlite/application/users.sqlite
  node dropDatabase.js application
  node dropDatabase.js application/database
  node dropDatabase.js ./db/sqlite/tenant --force
  NODE_ENV=production node dropDatabase.js analytics
  `);
};

/**
 * Main function to run the database drop utility
 */
export const run = async (): Promise<void> => {
  // Parse command line arguments
  const { dbPath, force } = parseArgs();

  // Show help if no database path provided
  if (!dbPath) {
    showHelp();
    process.exit(1);
    return;
  }

  try {
    // Drop the database
    await dropSqliteDatabase(dbPath, force);
    process.exit(0);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
};

// Run the script if it's called directly
if (require.main === module) {
  run();
}

// Export for testing and programmatic use
export { parseArgs as parseDropDatabaseArgs, showHelp as showDropDatabaseHelp };
