import { type SurveyResultModel } from '@/domain/models';
import { type SaveSurveyResultModel } from '@/domain/usecases';

export interface SaveSurveyResultRepository {
  save: (surveyResultData: SaveSurveyResultModel) => Promise<SurveyResultModel>;
}
