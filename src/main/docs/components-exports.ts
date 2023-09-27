import { badRequest, forbidden, serverError, unauthorized } from './components';
import { apiKeyAuthSchema } from './schemas';

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },

  badRequest,
  unauthorized,
  serverError,
  forbidden,
};
