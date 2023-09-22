import { type Controller } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../../decorators';
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller';
import { makeDbLoadSurveys } from '../../../usecases';

export const makeLoadSurveysController = (): Controller => {
  return makeLogControllerDecorator(new LoadSurveysController(makeDbLoadSurveys()));
};
