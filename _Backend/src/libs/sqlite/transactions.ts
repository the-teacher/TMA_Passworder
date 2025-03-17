import sqlite3 from 'sqlite3';

/**
 * SQLite Transaction Utilities
 *
 * This module provides utilities for working with SQLite transactions.
 *
 * @module sqlite/transactions
 */

/**
 * Begin a database transaction
 * @param db SQLite database connection
 */
export const beginTransaction = (db: sqlite3.Database): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run('BEGIN TRANSACTION', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

/**
 * Commit a database transaction
 * @param db SQLite database connection
 */
export const commitTransaction = (db: sqlite3.Database): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run('COMMIT', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

/**
 * Rollback a database transaction
 * @param db SQLite database connection
 */
export const rollbackTransaction = (db: sqlite3.Database): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run('ROLLBACK', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

/**
 * Execute a single SQL command on a database connection
 * @param db SQLite database connection
 * @param command SQL command to execute
 * @param params Parameters for the SQL command
 */
export const runCommand = (
  db: sqlite3.Database,
  command: string,
  params: any[] = [],
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(command, params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Execute a function within a transaction
 * @param db SQLite database connection
 * @param fn Function to execute within the transaction
 */
export const withTransaction = async <T>(
  db: sqlite3.Database,
  fn: () => Promise<T>,
): Promise<T> => {
  try {
    // Begin transaction
    await beginTransaction(db);

    // Execute the function
    const result = await fn();

    // Commit transaction
    await commitTransaction(db);

    return result;
  } catch (error) {
    // Rollback on any error
    try {
      await rollbackTransaction(db);
    } catch (rollbackError) {
      console.error(`Failed to rollback transaction: ${rollbackError}`);
    }
    throw error;
  }
};

/**
 * Execute multiple SQL commands within a transaction
 * @param db SQLite database connection
 * @param commands Array of SQL commands to execute
 * @param params Array of parameters for each command
 */
export const runCommands = async (
  db: sqlite3.Database,
  commands: string[],
  params: any[][] = [],
): Promise<void> => {
  await withTransaction(db, async () => {
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      const commandParams = params[i] || [];
      await runCommand(db, command, commandParams);
    }
  });
};
