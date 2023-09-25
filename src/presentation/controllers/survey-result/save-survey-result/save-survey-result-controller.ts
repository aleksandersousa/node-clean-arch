import { type Controller, type HttpRequest, type HttpResponse, type LoadSurveyById } from '.';

export class SaveSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId);

    return { body: null, statusCode: 200 };
  }
}
