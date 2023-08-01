import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account';
import { BcryptAdpater } from '../../../infra/cryptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account-mongo-repository';
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log';
import { SignupController } from '../../../presentation/controllers/signup/signup';
import { type Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators/log';
import { makeSignupValidation } from './signup-validation';

export const makeSignupController = (): Controller => {
  const salt = 12;
  const bcryptAdpater = new BcryptAdpater(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdpater, accountMongoRepository);
  const logMongoRespository = new LogMongoRepository();

  const signupController = new SignupController(dbAddAccount, makeSignupValidation());

  return new LogControllerDecorator(signupController, logMongoRespository);
};
