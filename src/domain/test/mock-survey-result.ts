import { type SurveyResultModel } from '@/domain/models';
import { type SaveSurveyResultParams } from '@/domain/usecases';

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date(),
});

export const mockSurveyResultModel = (): SurveyResultModel => {
  return Object.assign({}, mockSaveSurveyResultParams(), { id: 'ay_id' });
};
