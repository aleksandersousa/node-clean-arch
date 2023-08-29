import { BcryptAdpater } from '../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository';
import { type AddAccount } from '../../../../domain/usecases';
import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account';

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12;
  const bcryptAdpater = new BcryptAdpater(salt);

  const accountMongoRepository = new AccountMongoRepository();

  return new DbAddAccount(bcryptAdpater, accountMongoRepository);
};
