import { type Validation } from '@/presentation/protocols';
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';
import { makeSignupValidation } from './signup-validation-factory';
import { mockEmailValidator } from '@/validation/test';

jest.mock('@/validation/validators/validation-composite');

describe('SignupValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidation();

    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
    validations.push(new EmailValidation('email', mockEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
