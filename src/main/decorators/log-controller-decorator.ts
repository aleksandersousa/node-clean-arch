import { type LogErrorRepository } from '@/data/protocols';
import { type HttpRequest, type HttpResponse, type Controller } from '@/presentation/protocols';

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRespository: LogErrorRepository,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);

    if (httpResponse.statusCode === 500) {
      await this.logErrorRespository.logError(httpResponse.body.stack);
    }

    return httpResponse;
  }
}
