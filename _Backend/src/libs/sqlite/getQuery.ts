import { debug, error } from './logger';
import { type SQLiteDatabase } from './getDatabase';
/**
 * Executes a query and returns all results
 * @param dbPath Path to the SQLite database
 * @param query SQL query to execute
 * @param params Query parameters
 * @returns Promise resolving to an array of query results
 */
export const getAllQuery = <T = any>(
  db: SQLiteDatabase,
  query: string,
  params: any[] = [],
): Promise<T[]> => {
  debug(`Executing query: ${query}`, { db, params });

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        error(`Query error: ${err.message}`, { query, params, error: err });
        reject(err);
        return;
      }

      debug(`Query returned ${rows.length} rows`);
      resolve(rows as T[]);
    });
  });
};

/**
 * Executes a query and returns the first result
 * @param dbPath Path to the SQLite database
 * @param query SQL query to execute
 * @param params Query parameters
 * @returns Promise resolving to the first result or undefined if no results
 */
export const getFirstQuery = <T = any>(
  db: SQLiteDatabase,
  query: string,
  params: any[] = [],
): Promise<T | undefined> => {
  debug(`Executing first query: ${query}`, { params });

  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        error(`Query error: ${err.message}`, { query, params, error: err });
        reject(err);
        return;
      }

      debug(`Query returned ${row ? 'a row' : 'no rows'}`);
      resolve(row as T | undefined);
    });
  });
};
