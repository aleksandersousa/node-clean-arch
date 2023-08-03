import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account';
import { BcryptAdpater } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository';
import { SignupController } from '../../../presentation/controllers/signup/signup-controller';
import { type Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators/log-controller-decorator';
import { makeSignupValidation } from './signup-validation-factory';

export const makeSignupController = (): Controller => {
  const salt = 12;
  const bcryptAdpater = new BcryptAdpater(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdpater, accountMongoRepository);
  const logMongoRespository = new LogMongoRepository();

  const signupController = new SignupController(dbAddAccount, makeSignupValidation());

  return new LogControllerDecorator(signupController, logMongoRespository);
};
