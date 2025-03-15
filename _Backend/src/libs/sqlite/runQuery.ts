import sqlite3 from 'sqlite3';
import { getDatabase } from './getDatabase';

/**
 * Logs messages only when DEBUG_SQL environment variable is set
 * @param message Message to log
 * @param level Log level ('log', 'error', etc.)
 */
const log = (message: string, level: 'log' | 'error' | 'warn' = 'log'): void => {
  if (process.env.DEBUG_SQL) {
    console[level](message);
  }
};

/**
 * Execute a SQL command on a database connection
 * @param db SQLite database connection
 * @param command SQL command to execute
 */
const runCommand = (db: sqlite3.Database, command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(command, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

/**
 * Execute a SQL query on a database connection within a transaction
 * @param db SQLite database connection
 * @param sql SQL query to execute
 */
export const runSqlQuery = async (db: sqlite3.Database, sql: string): Promise<void> => {
  try {
    // Begin transaction
    log('Begin transaction');
    await runCommand(db, 'BEGIN TRANSACTION');

    // Execute the query
    await runCommand(db, sql);

    // Commit transaction
    await runCommand(db, 'COMMIT');
    log('Transaction was successfully committed');
  } catch (error) {
    // Rollback on any error
    try {
      await runCommand(db, 'ROLLBACK');
      log('Transaction rolled back', 'error');
    } catch (rollbackError) {
      log(`Failed to rollback transaction: ${rollbackError}`, 'error');
    }
    throw error;
  }
};

/**
 * Execute a SQL query with proper connection handling and error management
 * @param dbPath Path to the SQLite database file
 * @param sql SQL query to execute
 */
export const runQuery = async (dbPath: string, sql: string): Promise<void> => {
  const db = getDatabase(dbPath);

  try {
    await runSqlQuery(db, sql);
  } finally {
    // Always close the database connection
    db.close();
  }
};
