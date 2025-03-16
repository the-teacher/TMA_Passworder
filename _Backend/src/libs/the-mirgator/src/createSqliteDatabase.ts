import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { getDatabaseRootDir } from './databasePaths';

/**
 * The Migrator - SQLite Database Creation Module
 *
 * This module provides functionality for creating SQLite database files.
 *
 * Functions:
 * - createSqliteDatabase: Creates a new SQLite database file
 *
 * @module the-migrator/createSqliteDatabase
 */

/**
 * Examples:
 *
 * // Create a database with default parameters
 * createSqliteDatabase('users');
 * // Result: ./data/sqlite/{NODE_ENV}/application/users.sqlite
 *
 * // Create a database with a custom scope
 * createSqliteDatabase('products', 'tenant');
 * // Result: ./data/sqlite/{NODE_ENV}/tenant/products.sqlite
 *
 * // Create a database with a scope and custom directory
 * createSqliteDatabase('analytics', 'reporting', './src/data');
 * // Result: ./src/data/reporting/analytics.sqlite
 */

/**
 * Creates a new SQLite database file
 * @param dbName Name of the database (without extension)
 * @param scope Database scope (default: "application")
 * @param directory Directory to save the database (optional)
 * @param _testMode Test mode flag (default: false)
 * @returns Path to the created database file
 */
export const createSqliteDatabase = async (
  dbName: string,
  scope: string = 'application',
  directory?: string,
  _testMode = false,
): Promise<string> => {
  // Form the filename with .sqlite extension
  const fileName = `${dbName}.sqlite`;

  // Determine directory for database
  const projectDir = process.cwd();

  // If directory is provided, use it with the scope as a subdirectory
  // Otherwise, use the default path with scope based on NODE_ENV
  const dbDir = directory
    ? path.join(directory, scope)
    : path.join(projectDir, getDatabaseRootDir(), scope);

  // Check if directory exists and create it if necessary
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Full path to database file
  const dbPath = path.join(dbDir, fileName);

  // Check if database already exists
  if (fs.existsSync(dbPath)) {
    throw new Error(`Database already exists at path: ${dbPath}`);
  }

  // In test mode, just return the path without creating the database
  if (_testMode) {
    console.log(`SQLite database created: ${dbPath}`);
    return dbPath;
  }

  // Create the database by opening a connection and then closing it
  return new Promise<string>((resolve, reject) => {
    let db: sqlite3.Database;
    try {
      db = new sqlite3.Database(dbPath, (err) => {
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

          console.log(`SQLite database created: ${dbPath}`);
          resolve(dbPath);
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

/**
 * Creates a new SQLite database file (synchronous version)
 * @param dbName Name of the database (without extension)
 * @param scope Database scope (default: "application")
 * @param directory Directory to save the database (optional)
 * @returns Path to the created database file
 */
export const createSqliteDatabaseSync = (
  dbName: string,
  scope: string = 'application',
  directory?: string,
): string => {
  // Form the filename with .sqlite extension
  const fileName = `${dbName}.sqlite`;

  // Determine directory for database
  const projectDir = process.cwd();

  // If directory is provided, use it with the scope as a subdirectory
  // Otherwise, use the default path with scope based on NODE_ENV
  const dbDir = directory
    ? path.join(directory, scope)
    : path.join(projectDir, getDatabaseRootDir(), scope);

  // Check if directory exists and create it if necessary
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Full path to database file
  const dbPath = path.join(dbDir, fileName);

  // Check if database already exists
  if (fs.existsSync(dbPath)) {
    throw new Error(`Database already exists at path: ${dbPath}`);
  }

  // Create an empty file to initialize the database
  fs.writeFileSync(dbPath, '', 'utf8');

  console.log(`SQLite database created: ${dbPath}`);
  return dbPath;
};
