import { AccessDeniedError } from '../errors';
import { type LoadAccountByToken } from '../../domain/usecases';
import { forbidden } from '../helpers/http/http-helper';
import { type HttpRequest } from '../protocols';
import { AuthMiddleware } from './auth-middleware';
import { type AccountModel } from '../../domain/models';

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password',
});
const makeFakeHttpRequest = (): HttpRequest => ({
  headers: { 'x-access-token': 'any_token' },
});

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
      return await new Promise(resolve => {
        resolve(makeFakeAccount());
      });
    }
  }

  return new LoadAccountByTokenStub();
};

interface SutTypes {
  sut: AuthMiddleware;
  loadAccountByTokenStub: LoadAccountByToken;
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub);

  return { sut, loadAccountByTokenStub };
};

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');

    await sut.handle(makeFakeHttpRequest());

    expect(loadSpy).toHaveBeenCalledWith('any_token');
  });
});