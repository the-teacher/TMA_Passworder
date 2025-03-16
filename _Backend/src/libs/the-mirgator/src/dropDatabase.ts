#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { log } from './migrationLogger';

/**
 * The Migrator - Database Drop Utility
 *
 * This module provides functionality for safely dropping SQLite databases.
 * It includes a confirmation prompt and countdown timer before deletion.
 *
 * Functions:
 * - dropDatabase: Deletes a SQLite database file or directory after confirmation
 * - parseArgs: Parses command line arguments
 * - showHelp: Displays help information
 * - run: Main function that executes the database drop process
 *
 * Usage:
 *   node dropDatabase.js <dbPath> [--force]
 *
 * Examples:
 *   node dropDatabase.js ./db/sqlite/application/users.sqlite
 *   node dropDatabase.js ./db/sqlite/tenant --force
 *
 * TS EXAMPLE:
 *   tsx src/libs/the-mirgator/src/dropDatabase.ts ./data/sqlite/application/application.sqlite
 *
 * @module the-migrator/dropDatabase
 */

/**
 * Recursively removes a directory and all its contents
 * @param dirPath Path to the directory to remove
 */
const removeDirectory = (dirPath: string): void => {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursive call for directories
        removeDirectory(curPath);
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
};

/**
 * Drops a database file or directory
 * @param dbPath Path to the database file or directory
 * @param force Whether to skip confirmation (default: false)
 */
export const dropDatabase = async (dbPath: string, force: boolean = false): Promise<void> => {
  // Validate path exists
  if (!fs.existsSync(dbPath)) {
    throw new Error(`Path not found: ${dbPath}`);
  }

  const isDirectory = fs.lstatSync(dbPath).isDirectory();
  const targetType = isDirectory ? 'directory' : 'file';

  // Show warning
  log(`WARNING: You are about to delete the following database ${targetType}:`, 'warning');
  log(`Path: ${dbPath}`, 'warning');

  if (isDirectory) {
    log('This will delete ALL database files in this directory!', 'warning');
  }

  // Skip confirmation if force flag is set
  if (force) {
    log('Force flag detected. Skipping confirmation.', 'warning');
  } else {
    log('To cancel, press Ctrl+C now.', 'warning');
    log('Deletion will proceed in 10 seconds...', 'warning');

    // Wait for 10 seconds with countdown
    for (let i = 10; i > 0; i--) {
      process.stdout.write(`\r${i} seconds remaining...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    process.stdout.write('\n');
  }

  // Perform deletion
  try {
    if (isDirectory) {
      removeDirectory(dbPath);
      log(`Database directory deleted: ${dbPath}`, 'success');
    } else {
      fs.unlinkSync(dbPath);

      // Also delete schema file if it exists
      const schemaPath = dbPath.replace('.sqlite', '_schema.sql');
      if (fs.existsSync(schemaPath)) {
        fs.unlinkSync(schemaPath);
        log(`Schema file deleted: ${schemaPath}`, 'success');
      }

      log(`Database file deleted: ${dbPath}`, 'success');
    }
  } catch (error) {
    log(
      `Error deleting database: ${error instanceof Error ? error.message : String(error)}`,
      'error',
    );
    throw error;
  }
};

/**
 * Parses command line arguments
 */
export const parseArgs = (): {
  dbPath: string | undefined;
  force: boolean;
} => {
  const args = process.argv.slice(2);
  const dbPath = args[0];
  const force = args.includes('--force');

  return { dbPath, force };
};

/**
 * Shows help message
 */
export const showHelp = (): void => {
  console.log(`
The Migrator - Database Drop Utility

Usage:
  node dropDatabase.js <dbPath> [--force]

Arguments:
  dbPath    Path to the database file or directory to delete
  --force   Skip confirmation and delete immediately

Examples:
  node dropDatabase.js ./db/sqlite/application/users.sqlite
  node dropDatabase.js ./db/sqlite/tenant --force
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
    await dropDatabase(dbPath, force);
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
