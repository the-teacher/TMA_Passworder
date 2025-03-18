import { Response } from 'express';
import { z } from 'zod';

/**
 * Sends validation error response
 * @param res Express response
 * @param error Zod validation error
 * @returns Response with validation errors
 */
export const responseExistsInvalidParams = (res: Response, error: z.ZodError) => {
  return res.status(400).json({
    status: 'error',
    message: 'Validation error',
    errors: error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    })),
  });
};
