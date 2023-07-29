import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { BcryptAdpater } from '../../infra/cryptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account';
import { SignupController } from '../../presentation/controllers/signup/signup';
import { EmailValidatorAdpater } from '../../utils/email-validator-adapter';

export const makeSignupController = (): SignupController => {
  const salt = 12;
  const bcryptAdpater = new BcryptAdpater(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdpater, accountMongoRepository);
  const emailValidator = new EmailValidatorAdpater();

  return new SignupController(emailValidator, dbAddAccount);
};
