import { Request, Response } from 'express';
import {
  getBufferedLogs,
  resolveDatabasePath,
  createSqliteDatabase,
  dropSqliteDatabase,
  loadSqliteDatabaseSchema,
} from '@libs/the-mirgator/src';
import { getBufferedLogs as sqliteLogs } from '@libs/sqlite';
import { runQuery } from '@libs/sqlite/runQuery';
import { perform } from '../existsAction';

// Mock Express request and response
const mockRequest = (params = {}) =>
  ({
    params,
  }) as unknown as Request;

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('User Exists Action', () => {
  let req: Request;
  let res: Response;
  const dbPath = resolveDatabasePath('application/database') as string;

  beforeAll(async () => {
    // Setup test database
    await dropSqliteDatabase(dbPath, true);
    await createSqliteDatabase('application/database');

    // Load database schema
    await loadSqliteDatabaseSchema(
      'application/database',
      'data/sqlite/development/application/database_schema.sql',
    );

    // Create test data - we don't add any users yet, so queries should return false
  });

  afterAll(async () => {
    // Cleanup test database
    await dropSqliteDatabase(dbPath, true);
    console.log(getBufferedLogs());
    console.log(sqliteLogs());
  });

  beforeEach(() => {
    res = mockResponse();
  });

  test('should return exists=false when user does not exist in database', async () => {
    // Create request with valid parameters for a non-existent user
    req = mockRequest({ service: 'github', id: 'validuser123' });

    // Call the action
    await perform(req, res);

    // Verify the response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      exists: false,
      service: 'github',
      id: 'validuser123',
    });
  });

  test('should return exists=true when user exists in database', async () => {
    // First, add a test user to the database
    const userId = 1;
    const service = 'github';
    const providerId = 'existinguser456';

    // Insert a user
    await runQuery(
      dbPath,
      `INSERT INTO users (id, system_id, name, email)
       VALUES (?, ?, ?, ?)`,
      [userId, 'sys123456789', 'Test User', 'test@example.com'],
    );

    // Insert auth provider for the user
    await runQuery(
      dbPath,
      `INSERT INTO auth_providers (user_id, provider, provider_id)
       VALUES (?, ?, ?)`,
      [userId, service, providerId],
    );

    // Create request with parameters for the existing user
    req = mockRequest({ service, id: providerId });

    // Call the action
    await perform(req, res);

    // Verify the response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      exists: true,
      service,
      id: providerId,
    });
  });
});
