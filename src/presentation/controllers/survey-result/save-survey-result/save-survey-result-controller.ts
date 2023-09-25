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
      const { surveyId } = httpRequest.params;
      const { answer } = httpRequest.body;

      const survey = await this.loadSurveyById.loadById(surveyId);

      if (survey) {
        const answers = survey.answers.map(s => s.answer);

        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'));
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'));
      }

      return { body: null, statusCode: 200 };
    } catch (error) {
      return serverError(error);
    }
  }
}
