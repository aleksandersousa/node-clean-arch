import { type Validation } from '../../../../presentation/controllers/signup';
import { CompareFieldsValidation } from '../../../../presentation/helpers/validators/compare-fields-validation';
import { EmailValidation } from '../../../../presentation/helpers/validators/email-validation';
import { RequiredFieldValidation } from '../../../../presentation/helpers/validators/required-field-validation';
import { ValidationComposite } from '../../../../presentation/helpers/validators/validation-composite';
import { EmailValidatorAdpater } from '../../../adapters/validators/email-validator-adapter';

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdpater()));

  return new ValidationComposite(validations);
};
