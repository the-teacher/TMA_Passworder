import sqlite3 from 'sqlite3';

/**
 * Get a database connection
 * @param dbPath Path to the database file
 * @returns SQLite database connection
 */
export type SQLiteDatabase = sqlite3.Database & { path: string };

export const getDatabase = (dbPath: string): SQLiteDatabase => {
  if (typeof dbPath !== 'string') {
    throw new Error(`Invalid database path: ${dbPath}. String expected.`);
  }

  const db = new sqlite3.Database(dbPath) as SQLiteDatabase;
  db.path = dbPath;

  return db;
};
