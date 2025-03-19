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
 * @returns Full path to the database file
 */
export const resolveDatabasePath = (
  dbNameOrPath: string,
  options: {
    directory?: string;
  } = {},
): string => {
  const { directory } = options;

  // Get the absolute path to the database root directory
  const projectDir = process.cwd();
  const rootDir = directory || path.join(projectDir, getDatabaseRootDir());

  // If the path is already an absolute path or exists as is, return it
  if (path.isAbsolute(dbNameOrPath) || fs.existsSync(dbNameOrPath)) {
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

  return fullPath;
};

/**
 * Resolves the full database path and returns detailed path information
 *
 * @param dbNameOrPath Database name or path
 * @param options Configuration options
 * @param options.directory Optional custom base directory
 * @returns Path details object
 */
export const resolveDatabasePathWithDetails = (
  dbNameOrPath: string,
  options: {
    directory?: string;
  } = {},
): { dbDir: string; fileName: string; fullPath: string } => {
  const fullPath = resolveDatabasePath(dbNameOrPath, options);

  const dbDir = path.dirname(fullPath);
  const fileName = path.basename(fullPath);

  return { dbDir, fileName, fullPath };
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
