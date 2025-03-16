import path from 'path';

/**
 * The Migrator - Database Paths Utility
 *
 * This module provides utility functions for determining database paths
 * based on environment variables.
 *
 * @module the-migrator/databasePaths
 */

/**
 * Determines the root directory for database storage based on NODE_ENV
 * @returns The appropriate root directory path
 */
export const getDatabaseRootDir = (): string => {
  const nodeEnv = process.env.NODE_ENV || 'development';

  // For test environment, use tmp directory
  if (nodeEnv === 'test') {
    return path.join('tmp', 'sqlite', nodeEnv);
  }

  // For all other environments, use data directory with environment name
  return path.join('data', 'sqlite', nodeEnv);
};
