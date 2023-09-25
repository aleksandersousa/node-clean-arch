import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type LoadSurveyById,
  InvalidParamError,
  forbidden,
  serverError,
  type SaveSurveyResult,
  ok,
} from '.';

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const { answer } = httpRequest.body;
      const { accountId } = httpRequest;

      const survey = await this.loadSurveyById.loadById(surveyId);

      if (survey) {
        const answers = survey.answers.map(s => s.answer);

        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'));
        }

        const surveyResult = await this.saveSurveyResult.save({
          accountId: accountId as string,
          surveyId,
          answer,
          date: new Date(),
        });

        return ok(surveyResult);
      } else {
        return forbidden(new InvalidParamError('surveyId'));
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
