import { createSqliteDatabaseSchema } from './createSqliteDatabaseSchema';
import { log } from './logger';
import { type SQLiteDatabase } from '@libs/sqlite';
/**
 * Updates database schema file
 * @param dbPath Path to the database file
 */
export const updateDatabaseSchema = async (db: SQLiteDatabase): Promise<void> => {
  try {
    const schemaPath = await createSqliteDatabaseSchema(db);
    log(`Schema file updated: ${schemaPath}`, 'success');
  } catch (schemaError) {
    log(`Warning: Failed to update schema file: ${schemaError}`, 'warning');
    // Continue execution even if schema update fails
  }
};
