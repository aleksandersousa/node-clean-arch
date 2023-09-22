import { type NextFunction, type Request, type Response } from 'express';
import { type HttpRequest, type Middleware } from '../../../presentation/protocols';

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
    };

    const httpResponse = await middleware.handle(httpRequest);

    const statusCode = httpResponse.statusCode as number;
    if (statusCode === 200) {
      Object.assign(req, httpResponse);
      next();
    } else {
      res.status(statusCode).json(httpResponse.body.message);
    }
  };
};
