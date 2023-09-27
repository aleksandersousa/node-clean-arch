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
};
