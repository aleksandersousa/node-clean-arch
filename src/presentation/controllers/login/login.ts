import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { type HttpRequest, type HttpResponse, type Controller } from '../../protocols';
import { type EmailValidator } from '.';

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email } = httpRequest.body;

      const isEmailValid = this.emailValidator.isValid(email);
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }

      return ok(httpRequest);
    } catch (error) {
      return serverError(error);
    }
  }
}
