import { loginPath } from './paths/login-path';
import { accountSchema, loginParamsSchema } from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean node api',
    description: 'API do curso do manguinho para realizar enquetes entre programadores',
    version: '1.0.0',
  },

  servers: [{ url: '/api' }],

  tags: [{ name: 'Login' }],

  paths: {
    '/login': loginPath,
  },

  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
  },
};
