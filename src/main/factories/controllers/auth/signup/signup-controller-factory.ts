import { SignupController } from '@/presentation/controllers';
import { type Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeDbAuthentication, makeDbAddAccount } from '@/main/factories/usecases';
import { makeSignupValidation } from './signup-validation-factory';

export const makeSignupController = (): Controller => {
  return makeLogControllerDecorator(
    new SignupController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication()),
  );
};
