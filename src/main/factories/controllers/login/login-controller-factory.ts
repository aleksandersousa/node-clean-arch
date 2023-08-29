import { LoginController } from '../../../../presentation/controllers/login/login-controller';
import { type Controller } from '../../../../presentation/protocols';
import { makeLoginValidation } from './login-validation-factory';
import { makeDbAuthentication } from '../../usecases';
import { makeLogControllerDecorator } from '../../decorators';

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(new LoginController(makeDbAuthentication(), makeLoginValidation()));
};
