import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account';
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import { BcryptAdpater } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository';
import { SignupController } from '../../../presentation/controllers/signup/signup-controller';
import { type Controller } from '../../../presentation/protocols';
import env from '../../config/env';
import { LogControllerDecorator } from '../../decorators/log-controller-decorator';
import { makeSignupValidation } from './signup-validation-factory';

export const makeSignupController = (): Controller => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);

  const salt = 12;
  const bcryptAdpater = new BcryptAdpater(salt);

  const accountMongoRepository = new AccountMongoRepository();
  const logMongoRespository = new LogMongoRepository();
  const authentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdpater,
    jwtAdapter,
    accountMongoRepository,
  );
  const dbAddAccount = new DbAddAccount(bcryptAdpater, accountMongoRepository);

  const signupController = new SignupController(dbAddAccount, makeSignupValidation(), authentication);

  return new LogControllerDecorator(signupController, logMongoRespository);
};
