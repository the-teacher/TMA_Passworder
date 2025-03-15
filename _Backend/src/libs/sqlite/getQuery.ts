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
 * Base function to execute a query with a specific SQLite method
 * @param dbPath Path to the SQLite database file
 * @param sql SQL query to execute
 * @param params Parameters for the query
 * @param method SQLite method to use ('get' or 'all')
 * @returns Promise that resolves to the query result
 */
const executeQuery = async <T>(
  dbPath: string,
  sql: string,
  params: any[] = [],
  method: 'get' | 'all',
): Promise<T> => {
  const db = getDatabase(dbPath);

  try {
    return new Promise<T>((resolve, reject) => {
      db[method](sql, params, (err: Error | null, result: T) => {
        if (err) {
          log(`Error executing query: ${err.message}`, 'error');
          reject(err);
          return;
        }
        resolve(result as T);
      });
    });
  } catch (error) {
    log(`Query error: ${error instanceof Error ? error.message : String(error)}`, 'error');
    throw error;
  } finally {
    db.close();
  }
};

/**
 * Execute a SELECT query and return a single row
 * @param dbPath Path to the SQLite database file
 * @param sql SQL query to execute
 * @param params Parameters for the query (optional)
 * @returns Promise that resolves to a single row or undefined if not found
 */
export const getFirstQuery = async <T = any>(
  dbPath: string,
  sql: string,
  params: any[] = [],
): Promise<T | undefined> => {
  return executeQuery<T | undefined>(dbPath, sql, params, 'get');
};

/**
 * Execute a SELECT query and return all rows
 * @param dbPath Path to the SQLite database file
 * @param sql SQL query to execute
 * @param params Parameters for the query (optional)
 * @returns Promise that resolves to an array of rows
 */
export const getAllQuery = async <T = any>(
  dbPath: string,
  sql: string,
  params: any[] = [],
): Promise<T[]> => {
  return executeQuery<T[]>(dbPath, sql, params, 'all');
};
