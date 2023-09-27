import {
  accountSchema,
  addSurveyParamsSchema,
  errorSchema,
  loginParamsSchema,
  saveSurveyParamsSchema,
  signupParamsSchema,
  surveyAnswerSchema,
  surveyResultAnswerSchema,
  surveyResultSchema,
  surveySchema,
  surveysSchema,
} from './schemas';

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema,
  error: errorSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  surveyResultAnswer: surveyResultAnswerSchema,
};
