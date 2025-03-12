import { Request, Response } from 'express';
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

  beforeEach(() => {
    res = mockResponse();
  });

  describe('successful scenarios', () => {
    test('should return exists=true for valid id longer than 3 characters', () => {
      req = mockRequest({ service: 'github', id: 'validuser' });

      perform(req, res);

      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        exists: true,
        data: { service: 'github', id: 'validuser' },
      });
    });

    test('should return exists=false for id with special characters', () => {
      req = mockRequest({ service: 'telegram', id: 'invalid@user' });

      perform(req, res);

      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        exists: false,
        data: { service: 'telegram', id: 'invalid@user' },
      });
    });

    test('should return exists=false for id shorter than 4 characters', () => {
      req = mockRequest({ service: 'gmail', id: 'abc' });

      perform(req, res);

      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        exists: false,
        data: { service: 'gmail', id: 'abc' },
      });
    });
  });

  describe('error scenarios', () => {
    test('should return 400 for invalid service type', () => {
      req = mockRequest({ service: 'invalid-service', id: 'user123' });

      perform(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Invalid service type',
        error: expect.stringContaining('Service must be one of:'),
      });
    });

    test('should handle errors and return 500 status', () => {
      // Create a request with valid service but missing id
      req = mockRequest({ service: 'github' }); // Missing id parameter

      // Mock console.error to prevent test output pollution
      const originalConsoleError = console.error;
      console.error = jest.fn();

      perform(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Failed to check if user exists',
        error: expect.any(String),
      });

      // Restore console.error
      console.error = originalConsoleError;
    });
  });
});
