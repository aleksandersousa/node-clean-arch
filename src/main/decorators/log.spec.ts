import { type LogErrorRespository } from '../../data/protocols';
import { type AccountModel } from '../../domain/models';
import { ok, serverError } from '../../presentation/helpers/http/http-helper';
import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => {
        resolve(ok(makeFakeAccount()));
      });
    }
  }

  return new ControllerStub();
};
const makeLogErrorRespository = (): LogErrorRespository => {
  class LogErrorRespositoryStub implements LogErrorRespository {
    async logError(stack: string): Promise<void> {
      await new Promise(resolve => {
        resolve('');
      });
    }
  }

  return new LogErrorRespositoryStub();
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any name',
    email: 'any_email@mail.com',
    password: 'any password',
    passwordConfirmation: 'any password',
  },
});

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password',
});

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack_error';
  return serverError(fakeError);
};

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRespositoryStub: LogErrorRespository;
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRespositoryStub = makeLogErrorRespository();
  const sut = new LogControllerDecorator(controllerStub, logErrorRespositoryStub);

  return { sut, controllerStub, logErrorRespositoryStub };
};

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();

    const handleSpy = jest.spyOn(controllerStub, 'handle');

    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('Should return the same result of the Controller', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeAccount()));
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRespositoryStub } = makeSut();

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      new Promise((resolve, _reject) => {
        resolve(makeFakeServerError());
      }),
    );
    const logSpy = jest.spyOn(logErrorRespositoryStub, 'logError');

    await sut.handle(makeFakeRequest());
    expect(logSpy).toHaveBeenCalledWith('any_stack_error');
  });
});
