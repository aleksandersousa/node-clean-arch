import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, ok } from '../../helpers/http-helper';
import { type HttpRequest, type HttpResponse, type Controller } from '../../protocols';
import { type EmailValidator } from '.';

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'));
    }

    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError('password'));
    }

    const { email } = httpRequest.body;

    const isEmailValid = this.emailValidator.isValid(email);
    if (!isEmailValid) {
      return badRequest(new InvalidParamError('email'));
    }

    return ok(httpRequest);
  }
}
