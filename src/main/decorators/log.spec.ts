import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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

    const controllerStub = new ControllerStub();
    const sut = new LogControllerDecorator(controllerStub);

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
});
