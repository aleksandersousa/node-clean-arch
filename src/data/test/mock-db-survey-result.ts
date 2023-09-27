import { type LoadSurveyResultRepository, type SaveSurveyResultRepository } from '@/data/protocols';
import { type SaveSurveyResultParams } from '@/domain/usecases';
import { type SurveyResultModel } from '@/domain/models';
import { mockSurveyResultModel } from '@/domain/test';

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(_data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultRepositoryStub();
};

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId(surveyId: string): Promise<SurveyResultModel | null> {
      return await Promise.resolve(mockSurveyResultModel());
    }
  }
  return new LoadSurveyResultRepositoryStub();
};
