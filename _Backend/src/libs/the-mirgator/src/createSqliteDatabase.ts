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
 * createSqliteDatabase('application');
 * // Result: ./data/sqlite/{NODE_ENV}/application.sqlite
 *
 * // Create a database with a path-like name
 * createSqliteDatabase('hamster/application');
 * // Result: ./data/sqlite/{NODE_ENV}/hamster/application.sqlite
 *
 * // Create a database with a custom directory
 * createSqliteDatabase('tenant', './src/data');
 * // Result: ./src/data/tenant.sqlite
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
  // Check if dbName contains path separators
  const hasPathSeparators = dbName.includes('/') || dbName.includes('\\');

  // Determine directory and filename
  let dbDir: string;
  let fileName: string;

  if (hasPathSeparators) {
    // If dbName contains path separators, split it into directory and filename
    const dbNameParts = dbName.split(/[\/\\]/);
    fileName = `${dbNameParts.pop()}.sqlite`; // Last part becomes the filename
    const subDirs = dbNameParts.join('/'); // Rest becomes subdirectories

    // Combine with base directory
    const projectDir = process.cwd();
    const baseDir = directory || path.join(projectDir, getDatabaseRootDir());
    dbDir = path.join(baseDir, subDirs);
  } else {
    // Simple case - no path separators
    fileName = `${dbName}.sqlite`;
    const projectDir = process.cwd();
    dbDir = directory || path.join(projectDir, getDatabaseRootDir());
  }

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
 * @param directory Directory to save the database (optional)
 * @returns Path to the created database file
 */
export const createSqliteDatabaseSync = (dbName: string, directory?: string): string => {
  // Check if dbName contains path separators
  const hasPathSeparators = dbName.includes('/') || dbName.includes('\\');

  // Determine directory and filename
  let dbDir: string;
  let fileName: string;

  if (hasPathSeparators) {
    // If dbName contains path separators, split it into directory and filename
    const dbNameParts = dbName.split(/[\/\\]/);
    fileName = `${dbNameParts.pop()}.sqlite`; // Last part becomes the filename
    const subDirs = dbNameParts.join('/'); // Rest becomes subdirectories

    // Combine with base directory
    const projectDir = process.cwd();
    const baseDir = directory || path.join(projectDir, getDatabaseRootDir());
    dbDir = path.join(baseDir, subDirs);
  } else {
    // Simple case - no path separators
    fileName = `${dbName}.sqlite`;
    const projectDir = process.cwd();
    dbDir = directory || path.join(projectDir, getDatabaseRootDir());
  }

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
