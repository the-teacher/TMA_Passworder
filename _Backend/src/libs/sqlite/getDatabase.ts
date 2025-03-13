import sqlite3 from 'sqlite3';

// Database connection helper
export const getDatabase = (dbPath: string) => {
  return new sqlite3.Database(dbPath);
};
