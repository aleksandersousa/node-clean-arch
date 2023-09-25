import { type Router } from 'express';
import { adaptRoute } from '@/main/adapters';
import { auth } from '@/main/middlewares';
import { makeSaveSurveyResultController } from '../factories/controllers';

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()));
};
