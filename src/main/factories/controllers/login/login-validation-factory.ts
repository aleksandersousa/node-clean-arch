import { type Validation } from '../../../../presentation/controllers/signup';
import { EmailValidation } from '../../../../presentation/helpers/validators/email-validation';
import { RequiredFieldValidation } from '../../../../presentation/helpers/validators/required-field-validation';
import { ValidationComposite } from '../../../../presentation/helpers/validators/validation-composite';
import { EmailValidatorAdpater } from '../../../adapters/validators/email-validator-adapter';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdpater()));

  return new ValidationComposite(validations);
};