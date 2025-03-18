import { Request, Response } from 'express';

// Define constants for static text values
const ERROR_LOG_MESSAGE = 'Action error:';
const ERROR_RESPONSE_STATUS = 'error';
const ERROR_RESPONSE_MESSAGE = 'An error occurred while processing your request';
const UNKNOWN_ERROR_MESSAGE = 'Unknown error';

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
      console.error(ERROR_LOG_MESSAGE, error);
      res.status(500).json({
        status: ERROR_RESPONSE_STATUS,
        message: ERROR_RESPONSE_MESSAGE,
        error: error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
      });
    }
  };
};
