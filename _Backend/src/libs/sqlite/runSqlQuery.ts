import sqlite3 from 'sqlite3';

/**
 * Execute a SQL query on a database connection
 * @param db SQLite database connection
 * @param sql SQL query to execute
 */
export const runSqlQuery = (db: sqlite3.Database, sql: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
