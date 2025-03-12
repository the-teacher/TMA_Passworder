import { Request, Response } from 'express';

// perform - required method for each action
export const perform = (_req: Request, res: Response) => {
  res.send('Hello, TypeScript/JavaScript/Node.js/Express.js + The Router');
};
