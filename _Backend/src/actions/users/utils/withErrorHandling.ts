import { Request, Response } from 'express';

/**
 * Error handling wrapper for action handlers
 * @param handler Function to wrap with error handling
 * @returns Function that handles errors
 */
export const withErrorHandling = (handler: () => Promise<any>) => {
  return async (_req: Request, res: Response) => {
    try {
      await handler();
    } catch (error) {
      console.error('Action error:', error);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while processing your request',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
};
