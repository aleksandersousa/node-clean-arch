import { type Controller } from '@/presentation/protocols';
import { LoadSurveyResultController } from '@/presentation/controllers';
import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeDbLoadSurveyById, makeDbLoadSurveyResult } from '@/main/factories/usecases';

export const makeLoadSurveyResultController = (): Controller => {
  return makeLogControllerDecorator(new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult()));
};
