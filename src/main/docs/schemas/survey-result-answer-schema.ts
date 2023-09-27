export const surveyResultAnswerSchema = {
  type: 'object',
  properties: {
    image: { type: 'string' },
    answer: { type: 'string' },
    count: { type: 'integer' },
    total: { type: 'number' },
  },
  required: ['answer', 'count', 'total'],
};
