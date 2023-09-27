import { type LoadSurveyResult, type SurveyResultModel, type LoadSurveyResultRepository } from '.';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(private readonly loadSurveyResultRepositoryStub: LoadSurveyResultRepository) {}

  async load(surveyId: string): Promise<SurveyResultModel | null> {
    await this.loadSurveyResultRepositoryStub.loadBySurveyId(surveyId);
    return null;
  }
}
