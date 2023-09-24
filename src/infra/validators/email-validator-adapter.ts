import { type EmailValidator } from '@/validation/protocols';
import validator from 'validator';

export class EmailValidatorAdpater implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
