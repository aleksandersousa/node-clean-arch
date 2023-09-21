import env from '../../../../config/env';
import { DbAuthentication } from '../../../../../data/usecases/authentication/db-authentication';
import { BcryptAdpater } from '../../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter';
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository';
import { type Authentication } from '../../../../../domain/usecases';

export const makeDbAuthentication = (): Authentication => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);

  const salt = 12;
  const bcryptAdpater = new BcryptAdpater(salt);

  const accountMongoRepository = new AccountMongoRepository();

  return new DbAuthentication(accountMongoRepository, bcryptAdpater, jwtAdapter, accountMongoRepository);
};
