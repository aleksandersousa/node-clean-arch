import { type Validation } from '../../../../presentation/controllers/signup';
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators';
import { EmailValidatorAdpater } from '../../../../infra/validators';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdpater()));

  return new ValidationComposite(validations);
};
