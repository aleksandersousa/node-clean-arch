import { DbLoadAccountByToken } from '../../../../../data/usecases/load-account-by-token/db-load-account-by-token';
import { type LoadAccountByToken } from '../../../../../domain/usecases';
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter';
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository';
import env from '../../../../config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();

  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
