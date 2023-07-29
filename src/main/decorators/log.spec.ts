import { type LogErrorRespository } from '../../data/protocols/log-error-repository';
import { serverError } from '../../presentation/helpers/http-helper';
import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 0,
        body: {
          name: 'Aleksander',
        },
      };
      return await new Promise(resolve => {
        resolve(httpResponse);
      });
    }
  }

  return new ControllerStub();
};

const makeLogErrorRespository = (): LogErrorRespository => {
  class LogErrorRespositoryStub implements LogErrorRespository {
    async log(stack: string): Promise<void> {
      await new Promise(resolve => {
        resolve('');
      });
    }
  }

  return new LogErrorRespositoryStub();
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

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('Should return the same result of the Controller', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 0,
      body: {
        name: 'Aleksander',
      },
    });
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRespositoryStub } = makeSut();

    const fakeError = new Error();
    fakeError.stack = 'any_stack_error';
    const error = serverError(fakeError);
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      new Promise((resolve, _reject) => {
        resolve(error);
      }),
    );
    const logSpy = jest.spyOn(logErrorRespositoryStub, 'log');

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.handle(httpRequest);
    expect(logSpy).toHaveBeenCalledWith('any_stack_error');
  });
});
