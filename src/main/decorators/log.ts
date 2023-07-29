import { type LogErrorRespository } from '../../data/protocols/log-error-repository';
import { type HttpRequest, type HttpResponse, type Controller } from '../../presentation/protocols';

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRespository: LogErrorRespository,
  ) {
    this.controller = controller;
    this.logErrorRespository = logErrorRespository;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);

    if (httpResponse.statusCode === 500) {
      await this.logErrorRespository.log(httpResponse.body.stack);
    }

    return httpResponse;
  }
}
