import { type LoadAccountByToken } from '../../domain/usecases';
import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/http-helper';
import { type HttpRequest, type HttpResponse, type Middleware } from '../protocols';

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByTokenStub: LoadAccountByToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token'];
    if (accessToken) {
      await this.loadAccountByTokenStub.load(accessToken);
    }

    return forbidden(new AccessDeniedError());
  }
}