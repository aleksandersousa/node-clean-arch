import { type LogErrorRepository } from '@/data/protocols';
import { ok, serverError } from '@/presentation/helpers/http/http-helper';
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols';
import { LogControllerDecorator } from './log-controller-decorator';
import { mockLogErrorRepository } from '@/data/test';
import { mockAccountModel } from '@/domain/test';

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => {
        resolve(ok(mockAccountModel()));
      });
    }
  }

  return new ControllerStub();
};

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any name',
    email: 'any_email@mail.com',
    password: 'any password',
    passwordConfirmation: 'any password',
  },
});

const mockServerError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack_error';
  return serverError(fakeError);
};

type SutTypes = {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRespositoryStub: LogErrorRepository;
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRespositoryStub = mockLogErrorRepository();
  const sut = new LogControllerDecorator(controllerStub, logErrorRespositoryStub);

  return { sut, controllerStub, logErrorRespositoryStub };
};

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();

    const handleSpy = jest.spyOn(controllerStub, 'handle');

    const httpRequest = mockRequest();

    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('Should return the same result of the Controller', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(mockAccountModel()));
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRespositoryStub } = makeSut();

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      new Promise((resolve, _reject) => {
        resolve(mockServerError());
      }),
    );
    const logSpy = jest.spyOn(logErrorRespositoryStub, 'logError');

    await sut.handle(mockRequest());
    expect(logSpy).toHaveBeenCalledWith('any_stack_error');
  });
});
