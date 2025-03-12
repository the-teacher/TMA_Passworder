import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
  console.log('loggerMiddleware');
  next();
};
