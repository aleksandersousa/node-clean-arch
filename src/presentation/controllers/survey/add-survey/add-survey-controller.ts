import { type HttpRequest, type HttpResponse, type Controller, type Validation, type AddSurvey } from '.';
import { badRequest, serverError } from '../../../helpers/http/http-helper';

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { question, answers } = httpRequest.body;
      await this.addSurvey.add({ question, answers });

      return { statusCode: 200, body: { ok: 'ok' } };
    } catch (error) {
      return serverError(error);
    }
  }
}
