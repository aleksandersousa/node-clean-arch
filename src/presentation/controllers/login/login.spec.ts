import { LoginController } from './login';
import { badRequest } from '../../helpers/http-helper';
import { MissingParamError } from '../../errors';
import { type HttpRequest, type EmailValidator } from '.';

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(_email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

interface SutTypes {
  sut: LoginController;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new LoginController(emailValidatorStub);

  return { sut, emailValidatorStub };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any password',
  },
});

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: '',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')));
  });

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    await sut.handle(makeFakeRequest());
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
