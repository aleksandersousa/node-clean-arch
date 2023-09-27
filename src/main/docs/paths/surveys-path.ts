export const surveysPath = {
  get: {
    security: [{ apiKeyAuth: [] }],

    tags: ['Enquetes'],
    summary: 'Api para listar todas as enquetes',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveys',
            },
          },
        },
      },

      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' },
    },
  },

  post: {
    security: [{ apiKeyAuth: [] }],

    tags: ['Enquetes'],
    summary: 'Api para criar uma enquete',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addSurveyParams',
          },
        },
      },
    },
    responses: {
      204: { description: 'Sucesso' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' },
    },
  },
};
