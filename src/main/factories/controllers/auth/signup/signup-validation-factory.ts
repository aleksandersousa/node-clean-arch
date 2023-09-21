import { type Validation } from '../../../../../presentation/protocols';
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../../../validation/validators';
import { EmailValidatorAdpater } from '../../../../../infra/validators';

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdpater()));

  return new ValidationComposite(validations);
};
