import { type SaveSurveyResultRepository } from '@/data/protocols';
import { type SaveSurveyResultParams } from '@/domain/usecases';
import { type SurveyResultModel } from '@/domain/models';
import { mockSurveyResultModel } from '@/domain/test';

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(_data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => {
        resolve(mockSurveyResultModel());
      });
    }
  }
  return new SaveSurveyResultRepositoryStub();
};
