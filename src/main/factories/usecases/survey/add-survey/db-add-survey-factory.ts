import { type AddSurvey } from '@/domain/usecases';
import { DbAddSurvey } from '@/data/usecases';
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository';

export const makeDbAddSurvey = (): AddSurvey => {
  return new DbAddSurvey(new SurveyMongoRepository());
};
