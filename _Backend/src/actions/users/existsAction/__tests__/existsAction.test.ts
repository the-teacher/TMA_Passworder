import { Request, Response } from 'express';

import { perform } from '../existsAction';
import { createTestUser } from '../../createAction/queries/createTestUser';

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

  test('should return validation error when service is invalid', async () => {
    // Create request with invalid service
    req = mockRequest(req, { service: 'invalid-service', id: 'validuser123' });

    // Call the action
    await perform(req, res);

    // Verify the response
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        message: 'Validation error',
        errors: expect.arrayContaining([
          expect.objectContaining({
            path: 'service',
            message: expect.stringContaining('Invalid enum value'),
          }),
        ]),
      }),
    );
  });

  test('should return validation error when user ID is too short', async () => {
    // Create request with ID that's too short (less than 6 characters)
    req = mockRequest(req, { service: 'github', id: '12345' });

    // Call the action
    await perform(req, res);

    // Verify the response
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        message: 'Validation error',
        errors: expect.arrayContaining([
          expect.objectContaining({
            path: 'id',
            message: 'User ID must be at least 6 characters long',
          }),
        ]),
      }),
    );
  });

  test('should return validation error when user ID is empty', async () => {
    // Create request with empty ID
    req = mockRequest(req, { service: 'github', id: '' });

    // Call the action
    await perform(req, res);

    // Verify the response
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        message: 'Validation error',
        errors: expect.arrayContaining([
          expect.objectContaining({
            path: 'id',
            message: 'User ID is required',
          }),
        ]),
      }),
    );
  });

  test('should return validation error when extra parameters are provided', async () => {
    // Create request with extra parameters
    req = mockRequest(req, { service: 'github', id: 'validuser123', extra: 'param' });

    // Call the action
    await perform(req, res);

    // Verify the response
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        message: 'Validation error',
        errors: expect.arrayContaining([
          expect.objectContaining({
            message: expect.stringContaining('Additional parameters are not allowed'),
          }),
        ]),
      }),
    );
  });
});
