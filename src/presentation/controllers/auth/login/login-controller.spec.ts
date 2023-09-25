import { LoginController } from './login-controller';
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper';
import { MissingParamError } from '@/presentation/errors';
import { type HttpRequest, type Validation, type Authentication, type AuthenticationParams } from '.';

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(_input: any): Error | null {
      return null;
    }
  }

  return new ValidationStub();
};
const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(_authentication: AuthenticationParams): Promise<string> {
      return 'any_token';
    }
  }

  return new AuthenticationStub();
};

type SutTypes = {
  sut: LoginController;
  authenticationStub: Authentication;
  validationStub: Validation;
};

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication();
  const validationStub = makeValidation();
  const sut = new LoginController(authenticationStub, validationStub);

  return { sut, authenticationStub, validationStub };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password',
  },
});

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');

    await sut.handle(makeFakeRequest());
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' });
  });

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();

    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
      new Promise(resolve => {
        resolve('');
      }),
    );

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(unauthorized());
  });

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();

    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(
      new Promise((_resolve, reject) => {
        reject(new Error());
      }),
    );

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(
      ok({
        accessToken: 'any_token',
      }),
    );
  });

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut();

    const validateSpy = jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });
});
