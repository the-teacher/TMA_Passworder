import fs from 'fs';
import path from 'path';

/**
 * The Migrator - Database Path Utilities
 *
 * This module provides utilities for working with database paths.
 *
 * @module the-migrator/databasePaths
 */

/**
 * Get the root directory for database files based on environment
 * @returns Path to the database root directory
 */
export const getDatabaseRootDir = (): string => {
  const env = process.env.NODE_ENV || 'development';

  // Use temporary directory for test environment
  if (env === 'test') {
    return path.join('tmp', 'sqlite', 'test');
  }

  // Use data directory for other environments
  return path.join('data', 'sqlite', env);
};

/**
 * Resolves the full database path based on database name or path
 *
 * @param dbNameOrPath Database name or path
 * @param options Configuration options
 * @param options.directory Optional custom base directory
 * @param options.returnDetails Whether to return detailed path information
 * @returns Full path to the database file or path details object
 *
 * @example
 * // Basic usage with database name
 * resolveDatabasePath('users')
 * // Returns: '/path/to/project/data/sqlite/development/users.sqlite'
 *
 * @example
 * // With path-like database name
 * resolveDatabasePath('tenant/users')
 * // Returns: '/path/to/project/data/sqlite/development/tenant/users.sqlite'
 *
 * @example
 * // With custom directory
 * resolveDatabasePath('users', { directory: './custom/dir' })
 * // Returns: '/path/to/project/custom/dir/users.sqlite'
 *
 * @example
 * // Return detailed path information
 * resolveDatabasePath('tenant/users', { returnDetails: true })
 * // Returns: { dbDir: '...', fileName: 'users.sqlite', fullPath: '...' }
 */
export const resolveDatabasePath = (
  dbNameOrPath: string,
  options: {
    directory?: string;
    returnDetails?: boolean;
  } = {},
): string | { dbDir: string; fileName: string; fullPath: string } => {
  const { directory, returnDetails = false } = options;

  // Get the absolute path to the database root directory
  const projectDir = process.cwd();
  const rootDir = directory || path.join(projectDir, getDatabaseRootDir());

  // If the path is already an absolute path or exists as is, return it
  if (path.isAbsolute(dbNameOrPath) || fs.existsSync(dbNameOrPath)) {
    if (returnDetails) {
      const dbDir = path.dirname(dbNameOrPath);
      const fileName = path.basename(dbNameOrPath);
      return { dbDir, fileName, fullPath: dbNameOrPath };
    }
    return dbNameOrPath;
  }

  // Check if dbName contains path separators
  const hasPathSeparators = dbNameOrPath.includes('/') || dbNameOrPath.includes('\\');

  let dbDir: string;
  let fileName: string;
  let fullPath: string;

  if (hasPathSeparators) {
    // If dbName contains path separators, split it into directory and filename
    const dbNameParts = dbNameOrPath.split(/[\/\\]/);
    const lastPart = dbNameParts.pop() || '';
    fileName = lastPart.endsWith('.sqlite') ? lastPart : `${lastPart}.sqlite`;
    const subDirs = dbNameParts.join('/');

    // Combine with base directory
    dbDir = path.join(rootDir, subDirs);
    fullPath = path.join(dbDir, fileName);
  } else {
    // Simple case - no path separators
    fileName = dbNameOrPath.endsWith('.sqlite') ? dbNameOrPath : `${dbNameOrPath}.sqlite`;
    dbDir = rootDir;
    fullPath = path.join(rootDir, fileName);
  }

  return returnDetails ? { dbDir, fileName, fullPath } : fullPath;
};

/**
 * Recursively removes a directory and all its contents
 * @param dirPath Path to the directory to remove
 */
export const removeDirectory = (dirPath: string): void => {
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
