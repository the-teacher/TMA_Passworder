#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { log } from './migrationLogger';
import { getDatabaseRootDir } from './databasePaths';

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

// Configuration constants
const COUNTDOWN_SECONDS = 10;

/**
 * Resolves the full database path based on dbName
 * @param dbNameOrPath Database name or full path
 * @returns Full path to the database file
 */
const resolveDatabasePath = (dbNameOrPath: string): string => {
  // Get the absolute path to the database root directory
  const rootDir = path.resolve(process.cwd(), getDatabaseRootDir());

  // If the path is already an absolute path or exists as is, return it
  if (path.isAbsolute(dbNameOrPath) || fs.existsSync(dbNameOrPath)) {
    return dbNameOrPath;
  }

  // Check if dbName contains path separators
  const hasPathSeparators = dbNameOrPath.includes('/') || dbNameOrPath.includes('\\');

  let resolvedPath: string;

  if (hasPathSeparators) {
    // If dbName contains path separators, split it into directory and filename
    const dbNameParts = dbNameOrPath.split(/[\/\\]/);
    const fileName = `${dbNameParts.pop()}.sqlite`; // Last part becomes the filename
    const subDirs = dbNameParts.join('/'); // Rest becomes subdirectories

    // Combine with base directory
    resolvedPath = path.join(rootDir, subDirs, fileName);
  } else {
    // Simple case - no path separators
    const dbFileName = dbNameOrPath.endsWith('.sqlite') ? dbNameOrPath : `${dbNameOrPath}.sqlite`;
    resolvedPath = path.join(rootDir, dbFileName);
  }

  return resolvedPath;
};

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
 * Deletes a SQLite database file or directory after confirmation
 * @param dbPath Path to the database file or directory to delete
 * @param force Whether to skip confirmation countdown (default: false)
 */
export const dropDatabase = async (dbPath: string, force: boolean = false): Promise<void> => {
  // Validate path exists
  if (!fs.existsSync(dbPath)) {
    // Try to get the directory part of the path
    const dbDir = path.dirname(dbPath);
    const dbFileName = path.basename(dbPath);

    if (fs.existsSync(dbDir)) {
      log(`Database file not found: ${dbPath}`, 'warning');

      // Check if there are any other files in the directory
      const files = fs.readdirSync(dbDir);
      if (files.length === 0) {
        // If directory is empty, ask if user wants to remove it
        log(`Directory is empty: ${dbDir}`, 'warning');
        if (!force) {
          log('Do you want to remove the empty directory? (y/n)', 'warning');
          const answer = await new Promise<string>((resolve) => {
            process.stdin.once('data', (data) => {
              resolve(data.toString().trim().toLowerCase());
            });
          });

          if (answer === 'y' || answer === 'yes') {
            fs.rmdirSync(dbDir);
            log(`Empty directory removed: ${dbDir}`, 'success');
          } else {
            log('Directory removal cancelled', 'info');
          }
        } else {
          // If force flag is set, remove the directory without asking
          fs.rmdirSync(dbDir);
          log(`Empty directory removed: ${dbDir}`, 'success');
        }
      } else {
        // If directory is not empty, just inform the user
        log(`Directory is not empty, contains ${files.length} files. No action taken.`, 'info');
      }

      // Exit early since there's no database file to delete
      return;
    } else {
      log(`Database path not found: ${dbPath}`, 'warning');
      log('No action taken.', 'info');
      return;
    }
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
    log(`Deletion will proceed in ${COUNTDOWN_SECONDS} seconds...`, 'warning');

    // Wait for countdown seconds with countdown
    for (let i = COUNTDOWN_SECONDS; i > 0; i--) {
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
  const force = args.includes('--force');

  // Remove --force from args if present
  const cleanArgs = args.filter((arg) => arg !== '--force');

  let dbPath: string | undefined;

  if (cleanArgs.length >= 1) {
    const dbNameOrPath = cleanArgs[0];
    dbPath = resolveDatabasePath(dbNameOrPath);
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
