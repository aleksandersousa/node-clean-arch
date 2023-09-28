import {
  type SaveSurveyResult,
  type SaveSurveyResultRepository,
  type SurveyResultModel,
  type SaveSurveyResultParams,
  type LoadSurveyResultRepository,
} from '.';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
  ) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel | null> {
    await this.saveSurveyResultRepository.save(data);

    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId);
    return surveyResult;
  }
}
