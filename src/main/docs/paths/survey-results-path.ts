export const surveyResultsPath = {
  put: {
    security: [{ apiKeyAuth: [] }],

    tags: ['Respostas das Enquetes'],
    summary: 'Api para criar ou atualizar respostas de enquetes',
    parameters: [
      {
        in: 'path',
        name: 'surveyId',
        required: true,
        description: 'id da pesquisa',
        schema: {
          type: 'string',
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/saveSurveyParams',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult',
            },
          },
        },
      },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' },
    },
  },

  get: {
    security: [{ apiKeyAuth: [] }],

    tags: ['Respostas das Enquetes'],
    summary: 'Api para consultar o resultado de uma enquete',
    parameters: [
      {
        in: 'path',
        name: 'surveyId',
        required: true,
        description: 'id da pesquisa',
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult',
            },
          },
        },
      },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' },
    },
  },
};
