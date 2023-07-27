import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';
import { type Controller, type EmailValidator, type HttpRequest, type HttpResponse } from '../protocols';

export class SignupController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isEmailValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }

      return { statusCode: undefined, body: undefined };
    } catch (error) {
      return serverError();
    }
  }
}
