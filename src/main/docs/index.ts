import { badRequest, forbidden, serverError, unauthorized } from './components';
import { loginPath, surveysPath } from './paths';
import {
  accountSchema,
  apiKeyAuthSchema,
  errorSchema,
  loginParamsSchema,
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

  tags: [{ name: 'Login' }, { name: 'Enquete' }],

  paths: {
    '/login': loginPath,
    '/surveys': surveysPath,
  },

  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
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
