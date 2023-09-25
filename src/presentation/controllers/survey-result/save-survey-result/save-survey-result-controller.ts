import { InvalidParamError, forbidden } from '@/presentation/middlewares/auth';
import { type Controller, type HttpRequest, type HttpResponse, type LoadSurveyById } from '.';

export class SaveSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId);
    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'));
    }

    return { body: null, statusCode: 200 };
  }
}
