import { type NextFunction, type Request, type Response } from 'express';

export const contentType = (_req: Request, res: Response, next: NextFunction): void => {
  res.type('json');
  next();
};
