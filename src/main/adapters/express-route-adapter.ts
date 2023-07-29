import { type Request, type Response } from 'express';
import { type HttpRequest, type Controller } from '../../presentation/protocols';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode as number).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode as number).json(httpResponse.body.message);
    }
  };
};
