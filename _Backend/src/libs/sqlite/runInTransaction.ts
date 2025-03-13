import sqlite3 from 'sqlite3';
import { getDatabase } from './getDatabase';

/**
 * Executes a function within a database transaction
 *
 * @param dbPath Path to the SQLite database
 * @param operations Function containing database operations to execute in transaction
 * @returns Result of the operations function
 */
export const runInTransaction = async <T>(
  dbPath: string,
  operations: (db: sqlite3.Database) => Promise<T>,
): Promise<T> => {
  const db = getDatabase(dbPath);

  try {
    // Begin transaction
    await new Promise<void>((resolve, reject) => {
      db.run('BEGIN TRANSACTION', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Run the operations
    const result = await operations(db);

    // Commit transaction
    await new Promise<void>((resolve, reject) => {
      db.run('COMMIT', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return result;
  } catch (error) {
    // Rollback transaction on error
    await new Promise<void>((resolve) => {
      db.run('ROLLBACK', () => {
        resolve(); // Always resolve, even if rollback fails
      });
    });

    console.error('Transaction failed and was rolled back:', error);
    throw error;
  } finally {
    // Close the database connection
    db.close();
  }
};
