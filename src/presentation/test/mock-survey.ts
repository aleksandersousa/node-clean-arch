import { type AddSurveyParams, type AddSurvey, type LoadSurveyById, type LoadSurveys } from '@/domain/usecases';
import { type SurveyModel } from '@/domain/models';
import { mockSurveyModels, mockSurveyModel } from '@/domain/test';

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(_data: AddSurveyParams): Promise<void> {
      await Promise.resolve();
    }
  }
  return new AddSurveyStub();
};

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return await new Promise(resolve => {
        resolve(mockSurveyModels());
      });
    }
  }
  return new LoadSurveysStub();
};

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return await new Promise(resolve => {
        resolve(mockSurveyModel());
      });
    }
  }
  return new LoadSurveyByIdStub();
};
