import {
  type LoadSurveyResult,
  type SurveyResultModel,
  type LoadSurveyResultRepository,
  type LoadSurveyByIdRepository,
} from '.';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepositoryStub: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}

  async load(surveyId: string): Promise<SurveyResultModel | null> {
    const surveyResult = await this.loadSurveyResultRepositoryStub.loadBySurveyId(surveyId);
    if (!surveyResult) {
      await this.loadSurveyByIdRepository.loadById(surveyId);
    }

    return surveyResult;
  }
}
