import { type HttpRequest, type HttpResponse, type Controller, type Validation } from '.';

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body);

    return { statusCode: 200, body: { ok: 'ok' } };
  }
}
