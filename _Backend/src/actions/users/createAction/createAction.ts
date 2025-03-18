import { Request, Response } from 'express';

export const perform = (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'success',
    message: 'User created successfully',
  });
};
