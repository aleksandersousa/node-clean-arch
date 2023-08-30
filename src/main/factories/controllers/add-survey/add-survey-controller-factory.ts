import { type Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators';
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller';
import { makeAddSurveyValidation } from './add-survey-validation-factory';
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory';

export const makeAddSurveyController = (): Controller => {
  return makeLogControllerDecorator(new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey()));
};
