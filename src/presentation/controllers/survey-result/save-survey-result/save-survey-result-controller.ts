import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type LoadSurveyById,
  InvalidParamError,
  forbidden,
  serverError,
} from '.';

export class SaveSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId);
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }

      return { body: null, statusCode: 200 };
    } catch (error) {
      return serverError(error);
    }
  }
}
