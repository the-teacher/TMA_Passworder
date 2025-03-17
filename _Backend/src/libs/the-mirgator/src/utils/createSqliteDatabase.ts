import fs from 'fs';
import sqlite3 from 'sqlite3';
import { resolveDatabasePath } from './databasePaths';
import { log } from './logger';

/**
 * The Migrator - SQLite Database Creation Module
 *
 * This module provides functionality for creating SQLite database files.
 *
 * Functions:
 * - createSqliteDatabase: Creates a new SQLite database file
 *
 * @module the-migrator/utils/createSqliteDatabase
 */

/**
 * Creates a new SQLite database file
 * @param dbName Name of the database (without extension)
 * @param directory Directory to save the database (optional)
 * @param _testMode Test mode flag (default: false)
 * @returns Path to the created database file
 */
export const createSqliteDatabase = async (
  dbName: string,
  directory?: string,
  _testMode = false,
): Promise<string> => {
  // Resolve the database path
  const pathDetails = resolveDatabasePath(dbName, {
    directory,
    returnDetails: true,
  }) as { dbDir: string; fileName: string; fullPath: string };

  const { dbDir, fullPath } = pathDetails;

  // Check if directory exists and create it if necessary
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Check if database already exists
  if (fs.existsSync(fullPath)) {
    throw new Error(`Database already exists at path: ${fullPath}`);
  }

  // In test mode, just return the path without creating the database
  if (_testMode) {
    log(`SQLite database created: ${fullPath}`, 'info');
    return fullPath;
  }

  // Create the database by opening a connection and then closing it
  return new Promise<string>((resolve, reject) => {
    let db: sqlite3.Database;
    try {
      db = new sqlite3.Database(fullPath, (err) => {
        if (err) {
          reject(new Error(`Error creating database: ${err.message}`));
          return;
        }

        // Close the database connection
        db.close((closeErr: Error | null) => {
          if (closeErr) {
            reject(new Error(`Error closing database: ${closeErr.message}`));
            return;
          }

          log(`SQLite database created: ${fullPath}`, 'success');
          resolve(fullPath);
        });
      });
    } catch (error) {
      reject(
        new Error(
          `Error creating database: ${error instanceof Error ? error.message : String(error)}`,
        ),
      );
    }
  });
};
