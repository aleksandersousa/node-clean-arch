import { type Request, type Response } from 'express';
import { type HttpRequest, type Controller } from '@/presentation/protocols';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      params: req.params,
      body: req.body,
      accountId: req.accountId,
    };

    const httpResponse = await controller.handle(httpRequest);

    const statusCode = httpResponse.statusCode as number;
    if (statusCode >= 200 && statusCode <= 299) {
      res.status(statusCode).json(httpResponse.body);
    } else {
      res.status(statusCode).json({ error: httpResponse.body.message });
    }
  };
};
