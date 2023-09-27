import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
  ok,
  type LoadSurveyById,
  forbidden,
  InvalidParamError,
} from '.';

export class LoadSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { surveyId } = httpRequest.params;

    const surveyResult = await this.loadSurveyById.loadById(surveyId);
    if (!surveyResult) {
      return forbidden(new InvalidParamError('surveyId'));
    }

    return ok(null);
  }
}
