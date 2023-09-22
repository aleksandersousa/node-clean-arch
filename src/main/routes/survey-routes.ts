import { type Router } from 'express';
import { adaptRoute } from '../adapters/express/express-route-adapter';
import { makeAddSurveyController, makeLoadSurveysController } from '../factories/controllers';
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware';
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter';

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'));
  const auth = adaptMiddleware(makeAuthMiddleware());

  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()));
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()));
};
