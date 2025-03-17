import sqlite3 from 'sqlite3';

/**
 * Get a database connection
 * @param dbPath Path to the database file
 * @returns SQLite database connection
 */
export const getDatabase = (dbPath: string): sqlite3.Database => {
  if (typeof dbPath !== 'string') {
    throw new Error(`Invalid database path: ${dbPath}. String expected.`);
  }
  return new sqlite3.Database(dbPath);
};
