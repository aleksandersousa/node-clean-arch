import { LoginController } from '@/presentation/controllers';
import { type Controller } from '@/presentation/protocols';
import { makeDbAuthentication } from '@/main/factories/usecases';
import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeLoginValidation } from './login-validation-factory';

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(new LoginController(makeDbAuthentication(), makeLoginValidation()));
};
