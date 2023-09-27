import {
  type LoadSurveyResult,
  type SurveyResultModel,
  type SurveyResultAnswerModel,
  type LoadSurveyResultRepository,
  type LoadSurveyByIdRepository,
} from '.';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepositoryStub: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}

  async load(surveyId: string): Promise<SurveyResultModel | null> {
    let surveyResult = await this.loadSurveyResultRepositoryStub.loadBySurveyId(surveyId);
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId);

      surveyResult = {
        surveyId: survey?.id as string,
        question: survey?.question as string,
        date: survey?.date as Date,
        answers: survey?.answers?.map(a => ({ ...a, count: 0, percent: 0 })) as SurveyResultAnswerModel[],
      };
    }

    return surveyResult;
  }
}
