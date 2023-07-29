import { LoginController } from './login';
import { badRequest } from '../../helpers/http-helper';
import { MissingParamError } from '../../errors';

const makeSut = (): LoginController => {
  return new LoginController();
};

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        password: '',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  test('Should return 400 if no email is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')));
  });
});