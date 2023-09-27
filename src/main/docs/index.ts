import { badRequest, forbidden, serverError, unauthorized } from './components';
import { loginPath, signupPath, surveysPath } from './paths';
import {
  accountSchema,
  apiKeyAuthSchema,
  errorSchema,
  loginParamsSchema,
  signupParamsSchema,
  surveyAnswerSchema,
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
  },

  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
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
