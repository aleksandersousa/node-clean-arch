import env from '../../config/env';
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import { BcryptAdpater } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository';
import { LoginController } from '../../../presentation/controllers/login/login-controller';
import { type Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators/log-controller-decorator';
import { makeLoginValidation } from './login-validation-factory';

export const makeLoginController = (): Controller => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);

  const salt = 12;
  const bcryptAdpater = new BcryptAdpater(salt);

  const accountMongoRepository = new AccountMongoRepository();

  const authentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdpater,
    jwtAdapter,
    accountMongoRepository,
  );

  const logMongoRespository = new LogMongoRepository();

  const loginController = new LoginController(authentication, makeLoginValidation());

  return new LogControllerDecorator(loginController, logMongoRespository);
};
