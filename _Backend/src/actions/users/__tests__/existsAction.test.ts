import { Request, Response } from 'express'
import { perform } from '../existsAction'

// Mock Express request and response
const mockRequest = (params = {}) =>
  ({
    params,
  }) as unknown as Request

const mockResponse = () => {
  const res: Partial<Response> = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res as Response
}

describe('User Exists Action', () => {
  let req: Request
  let res: Response

  beforeEach(() => {
    res = mockResponse()
  })

  describe('successful scenarios', () => {
    test('should return exists=true for valid login longer than 3 characters', () => {
      req = mockRequest({ login: 'validuser' })

      perform(req, res)

      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        exists: true,
        login: 'validuser',
      })
    })

    test('should return exists=false for login with special characters', () => {
      req = mockRequest({ login: 'invalid@user' })

      perform(req, res)

      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        exists: false,
        login: 'invalid@user',
      })
    })

    test('should return exists=false for login shorter than 4 characters', () => {
      req = mockRequest({ login: 'abc' })

      perform(req, res)

      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        exists: false,
        login: 'abc',
      })
    })
  })

  describe('error scenarios', () => {
    test('should handle errors and return 500 status', () => {
      // Create a request that will cause an error
      req = mockRequest({}) // Missing login parameter

      // Mock console.error to prevent test output pollution
      const originalConsoleError = console.error
      console.error = jest.fn()

      perform(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Failed to check if user exists',
        error: expect.any(String),
      })

      // Restore console.error
      console.error = originalConsoleError
    })
  })
})
