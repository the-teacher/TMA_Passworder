/**
 * Execute a SQL query with proper connection handling and error management
 * @param dbPath Path to the SQLite database file
 * @param sql SQL query to execute
 */

import { getDatabase } from './getDatabase';
import { runSqlQuery } from './runSqlQuery';

export const runQuery = async (dbPath: string, sql: string): Promise<void> => {
  const db = getDatabase(dbPath);

  try {
    await runSqlQuery(db, sql);
  } catch (error) {
    throw error;
  } finally {
    // Close the database connection
    db.close();
  }
};
