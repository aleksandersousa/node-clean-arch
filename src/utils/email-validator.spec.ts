import { EmailValidatorAdpater } from './email-validator';

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdpater();

    const isValid = sut.isValid('invalid@mail.com');

    expect(isValid).toBe(false);
  });
});
