import { AuthMiddleware } from '../../../presentation/middlewares/auth/auth-middleware';
import { type Middleware } from '../../../presentation/protocols';
import { makeDbLoadAccountByToken } from '../usecases';

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role);
};
