import { type LoadSurveyResultRepository } from '@/data/protocols';
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
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;

      const survey = await this.loadSurveyById.loadById(surveyId);
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }

      const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(survey.id);

      return ok(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}
