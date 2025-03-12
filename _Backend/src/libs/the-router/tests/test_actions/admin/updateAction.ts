import { Request, Response } from 'express';

export const perform = (_req: Request, res: Response) => {
  return res.send('Admin Update!');
};
