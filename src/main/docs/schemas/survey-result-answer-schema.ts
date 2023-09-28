export const surveyResultAnswerSchema = {
  type: 'object',
  properties: {
    image: { type: 'string' },
    answer: { type: 'string' },
    count: { type: 'integer' },
    total: { type: 'number' },
    isCurrentAccountAnswer: { type: 'boolean' },
  },
  required: ['answer', 'count', 'percent', 'isCurrentAccountAnswer'],
};
