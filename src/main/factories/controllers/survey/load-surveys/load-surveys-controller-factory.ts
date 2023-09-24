import { type Controller } from '@/presentation/protocols';
import { LoadSurveysController } from '@/presentation/controllers';
import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeDbLoadSurveys } from '@/main/factories/usecases';

export const makeLoadSurveysController = (): Controller => {
  return makeLogControllerDecorator(new LoadSurveysController(makeDbLoadSurveys()));
};
