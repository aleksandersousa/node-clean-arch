import { InvalidParamError } from '../../errors';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import {
  type Validation,
  type AddAccount,
  type Controller,
  type EmailValidator,
  type HttpRequest,
  type HttpResponse,
} from '.';

export class SignupController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
  ) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
    this.validation = validation;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { name, email, password } = httpRequest.body;

      const isEmailValid = this.emailValidator.isValid(email);
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = await this.addAccount.add({ name, email, password });

      return ok(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
