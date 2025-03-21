import { Response, NextFunction, Request } from 'express';
import { RequestHandler } from 'express';

type TestRequest = Request & {
  testData?: string;
};

// Test middleware that adds data to request
export const addDataMiddleware = (req: TestRequest, _res: Response, next: NextFunction) => {
  req.testData = 'middleware data';
  next();
};

// Test middleware that checks authorization
export const authMiddleware: RequestHandler = (
  req: TestRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer valid-token') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// New middleware
export const validateMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
  next();
};

export const loggerMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
  next();
};
