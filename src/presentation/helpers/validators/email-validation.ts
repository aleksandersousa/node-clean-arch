import { InvalidParamError } from '../../errors';
import { type EmailValidator } from '../../protocols/email-validator';
import { type Validation } from './validation';

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {
    this.fieldName = fieldName;
    this.emailValidator = emailValidator;
  }

  validate(input: any): Error | null {
    const isEmailValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isEmailValid) {
      return new InvalidParamError(this.fieldName);
    }

    return null;
  }
}