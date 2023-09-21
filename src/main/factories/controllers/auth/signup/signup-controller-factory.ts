import { SignupController } from '../../../../../presentation/controllers';
import { type Controller } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../../decorators';
import { makeDbAuthentication, makeDbAddAccount } from '../../../usecases';
import { makeSignupValidation } from './signup-validation-factory';

export const makeSignupController = (): Controller => {
  return makeLogControllerDecorator(
    new SignupController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication()),
  );
};
