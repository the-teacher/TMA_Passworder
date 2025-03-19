import {
  resolveDatabasePath,
  dropSqliteDatabase,
  createSqliteDatabase,
  loadSqliteDatabaseSchema,
} from '@libs/the-mirgator';

/**
 * Set up a fresh test database
 * @returns The path to the test database
 */
export const setupTestDatabase = async (): Promise<string> => {
  const dbPath = resolveDatabasePath('application/database') as string;

  await dropSqliteDatabase(dbPath, true);

  // Create a new database
  await createSqliteDatabase('application/database');

  // Load the schema
  await loadSqliteDatabaseSchema(
    'application/database',
    'data/sqlite/development/application/database_schema.sql',
  );

  return dbPath;
};
