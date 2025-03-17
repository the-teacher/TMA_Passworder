import { Request, Response } from 'express';

import {
  // getBufferedLogs as migratorLogs,
  resolveDatabasePath,
  createSqliteDatabase,
  dropSqliteDatabase,
  loadSqliteDatabaseSchema,
} from '@libs/the-mirgator';

// Helper functions for database operations
export const setupTestDatabase = async () => {
  const dbPath = resolveDatabasePath('application/database') as string;
  await dropSqliteDatabase(dbPath, true);
  await createSqliteDatabase('application/database');
  await loadSqliteDatabaseSchema(
    'application/database',
    'data/sqlite/development/application/database_schema.sql',
  );
  return dbPath;
};

export const cleanupTestDatabase = async (dbPath: string) => {
  await dropSqliteDatabase(dbPath, true);
  // console.log(migratorLogs());
  // console.log(sqliteLogs());
};

export const mockRequest = (req: Request, params = {}) =>
  ({
    ...req,
    params,
  }) as unknown as Request;

export const mockResponse = () => {
  const response: Partial<Response> = {};
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response as Response;
};
