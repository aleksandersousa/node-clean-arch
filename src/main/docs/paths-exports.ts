import { loginPath, signupPath, surveyResultsPath, surveysPath } from './paths';

const paths = {
  '/login': loginPath,
  '/signup': signupPath,
  '/surveys': surveysPath,
  '/surveys/{surveyId}/results': surveyResultsPath,
};

export default paths;
