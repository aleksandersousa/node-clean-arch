import { type Controller } from '@/presentation/protocols';
import { AddSurveyController } from '@/presentation/controllers';
import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeDbAddSurvey } from '@/main/factories/usecases';
import { makeAddSurveyValidation } from './add-survey-validation-factory';

export const makeAddSurveyController = (): Controller => {
  return makeLogControllerDecorator(new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey()));
};
