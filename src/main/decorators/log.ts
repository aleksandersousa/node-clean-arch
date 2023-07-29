import { type HttpRequest, type HttpResponse, type Controller } from '../../presentation/protocols';

export class LogControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {
    this.controller = controller;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);

    return httpResponse;
  }
}