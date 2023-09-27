import { badRequest, forbidden, serverError, unauthorized } from './components';
import { loginPath, signupPath, surveyResultsPath, surveysPath } from './paths';
import {
  accountSchema,
  addSurveyParamsSchema,
  apiKeyAuthSchema,
  errorSchema,
  loginParamsSchema,
  saveSurveyParamsSchema,
  signupParamsSchema,
  surveyAnswerSchema,
  surveyResultSchema,
  surveySchema,
  surveysSchema,
} from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean node api',
    description: 'API do curso do manguinho para realizar enquetes entre programadores',
    version: '1.0.0',
  },

  servers: [{ url: '/api' }],

  tags: [{ name: 'Autenticação' }, { name: 'Enquetes' }],

  paths: {
    '/login': loginPath,
    '/signup': signupPath,
    '/surveys': surveysPath,
    '/surveys/{surveyId}/results': surveyResultsPath,
  },

  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    addSurveyParams: addSurveyParamsSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema,
  },

  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema,
    },

    badRequest,
    unauthorized,
    serverError,
    forbidden,
  },
};
