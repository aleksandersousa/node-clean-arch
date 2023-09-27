import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
  ok,
  type LoadSurveyById,
  forbidden,
  InvalidParamError,
  serverError,
} from '.';

export class LoadSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;

      const survey = await this.loadSurveyById.loadById(surveyId);
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }

      return ok(null);
    } catch (error) {
      return serverError(error);
    }
  }
}
