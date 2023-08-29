import { type AddSurveyModel } from '../../../usecases/add-survey';

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>;
}
