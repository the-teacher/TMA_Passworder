import { getDatabase, type SQLiteDatabase } from './getDatabase';
import { runCommand, withTransaction } from './transactions';

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
 * Execute a SQL query on a database connection within a transaction
 * @param db SQLite database connection
 * @param sql SQL query to execute
 * @param params Parameters for the SQL query
 */
export const runSqlQuery = async (
  db: SQLiteDatabase,
  sql: string,
  params: any[] = [],
): Promise<void> => {
  try {
    await withTransaction(db, async () => {
      await runCommand(db, sql, params);
    });

    log('Transaction was successfully committed');
  } catch (error) {
    log(`Transaction failed: ${error}`, 'error');
    throw error;
  }
};

/**
 * Execute a SQL query with proper connection handling and error management
 * @param dbPath Path to the SQLite database file
 * @param sql SQL query to execute
 * @param params Parameters for the SQL query (optional)
 */
export const runQuery = async (dbPath: string, sql: string, params: any[] = []): Promise<void> => {
  const db = getDatabase(dbPath);

  try {
    await runSqlQuery(db, sql, params);
  } finally {
    // Always close the database connection
    console.log('Closing database connection 1');
    db.close();
  }
};
