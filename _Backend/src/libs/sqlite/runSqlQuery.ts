import sqlite3 from 'sqlite3';

export const runSqlQuery = (db: sqlite3.Database, query: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
