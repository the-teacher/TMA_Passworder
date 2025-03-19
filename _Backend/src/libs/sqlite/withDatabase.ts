import { getDatabase, type SQLiteDatabase } from './getDatabase';
import { resolveDatabasePath } from '@libs/the-mirgator';

export const withDatabase = async <T>(
  dbName: string,
  callback: (db: SQLiteDatabase) => Promise<T>,
): Promise<T> => {
  const dbPath = resolveDatabasePath(dbName);
  const db = getDatabase(dbPath);

  let result: T;

  try {
    result = await callback(db);
    return result;
  } finally {
    db.close();
  }
};
