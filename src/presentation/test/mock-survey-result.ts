import { type SaveSurveyResult, type SaveSurveyResultParams } from '@/domain/usecases';
import { type SurveyResultModel } from '@/domain/models';
import { mockSurveyResultModel } from '@/domain/test';

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(_data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultStub();
};
