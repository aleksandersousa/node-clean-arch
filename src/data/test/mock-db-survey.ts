import { type AddSurveyRepository, type LoadSurveyByIdRepository, type LoadSurveysRepository } from '@/data/protocols';
import { type AddSurveyParams } from '@/domain/usecases';
import { type SurveyModel } from '@/domain/models';
import { mockSurveyModel, mockSurveyModels } from '@/domain/test';

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(_surveyData: AddSurveyParams): Promise<void> {
      await new Promise<void>(resolve => {
        resolve();
      });
    }
  }
  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(_id: string): Promise<SurveyModel> {
      return await new Promise(resolve => {
        resolve(mockSurveyModel());
      });
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return await new Promise(resolve => {
        resolve(mockSurveyModels());
      });
    }
  }
  return new LoadSurveysRepositoryStub();
};
