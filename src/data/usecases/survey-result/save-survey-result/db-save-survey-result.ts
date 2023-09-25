import {
  type SaveSurveyResult,
  type SaveSurveyResultRepository,
  type SurveyResultModel,
  type SaveSurveyResultParams,
} from '.';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel | null> {
    const surveyResult = await this.saveSurveyResultRepository.save(data);
    return surveyResult;
  }
}
