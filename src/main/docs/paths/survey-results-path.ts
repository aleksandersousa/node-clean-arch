export const surveyResultsPath = {
  put: {
    security: [{ apiKeyAuth: [] }],

    tags: ['Respostas das Enquetes'],
    summary: 'Api para criar ou atualizar respostas de enquetes',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [
      {
        in: 'path',
        name: 'surveyId',
        required: true,
        description: 'ID da enquete a ser respondida',
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
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [
      {
        in: 'path',
        name: 'surveyId',
        required: true,
        description: 'ID da enquete a ser respondida',
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
