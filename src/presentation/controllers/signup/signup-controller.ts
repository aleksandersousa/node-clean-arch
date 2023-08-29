import { badRequest, forbidden, ok, serverError } from '../../helpers/http/http-helper';
import {
  type Validation,
  type AddAccount,
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type Authentication,
} from '.';
import { EmailInUseError } from '../../errors';

export class SignupController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { name, email, password } = httpRequest.body;

      const account = await this.addAccount.add({ name, email, password });

      if (!account) {
        return forbidden(new EmailInUseError());
      }

      const accessToken = await this.authentication.auth({ email, password });

      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
