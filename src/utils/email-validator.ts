import { type EmailValidator } from '../presentation/protocols/email-validator';

export class EmailValidatorAdpater implements EmailValidator {
  isValid(email: string): boolean {
    return false;
  }
}
