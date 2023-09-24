import { type Router } from 'express';
import { adaptRoute } from '@/main/adapters';
import { makeSignupController, makeLoginController } from '@/main/factories/controllers';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
