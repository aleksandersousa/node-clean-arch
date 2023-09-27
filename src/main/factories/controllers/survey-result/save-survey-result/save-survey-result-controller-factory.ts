import { type Controller } from '@/presentation/protocols';
import { SaveSurveyResultController } from '@/presentation/controllers';
import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeDbSaveSurveyResult, makeDbLoadSurveyById } from '@/main/factories/usecases';

export const makeSaveSurveyResultController = (): Controller => {
  return makeLogControllerDecorator(new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult()));
};
