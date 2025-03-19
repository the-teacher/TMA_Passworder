import {
  resolveDatabasePath,
  createSqliteDatabase,
  loadSqliteDatabaseSchema,
} from '@libs/the-mirgator';

/**
 * Set up a fresh test database with a random name
 * @returns The path to the test database
 */
export const setupTestDatabase = async (): Promise<string> => {
  // Generate a unique database name using timestamp and random number
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  const randomDbName = `application/database_test_${timestamp}_${random}`;

  const dbPath = resolveDatabasePath(randomDbName) as string;

  // Create a new database with the random name
  await createSqliteDatabase(randomDbName);

  // Load the schema
  await loadSqliteDatabaseSchema(
    randomDbName,
    'data/sqlite/development/application/database_schema.sql',
  );

  return dbPath;
};
