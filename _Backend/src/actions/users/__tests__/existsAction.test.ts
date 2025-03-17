import { Request, Response } from 'express';
import { perform } from '../existsAction';
import { createTestUser } from '../queries/createTestUser';

import { mockRequest, mockResponse } from '@utils/tests/mockHelpers';
import { setupTestDatabase, cleanupTestDatabase } from '@utils/tests/dbHelpers';

describe('User Exists Action', () => {
  let req: Request;
  let res: Response;
  let dbPath: string;

  beforeAll(async () => {
    dbPath = await setupTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase(dbPath);
  });

  beforeEach(() => {
    res = mockResponse();
  });

  test('should return exists=false when user does not exist in database', async () => {
    // Create request with valid parameters for a non-existent user
    req = mockRequest(req, { service: 'github', id: 'validuser123' });

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

    // Create test user in database
    await createTestUser(dbPath, userId, service, providerId);

    // Create request with parameters for the existing user
    req = mockRequest(req, { service, id: providerId });

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
