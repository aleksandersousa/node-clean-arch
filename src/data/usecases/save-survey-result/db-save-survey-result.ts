import {
  type SaveSurveyResult,
  type SaveSurveyResultRepository,
  type SurveyResultModel,
  type SaveSurveyResultModel,
} from '.';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data);
    return surveyResult;
  }
}
