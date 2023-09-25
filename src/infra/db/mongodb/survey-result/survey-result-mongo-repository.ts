import { type SaveSurveyResultRepository } from '@/data/protocols';
import { type SurveyResultModel } from '@/domain/models';
import { type SaveSurveyResultParams } from '@/domain/usecases';
import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(surveyResultData: SaveSurveyResultParams): Promise<SurveyResultModel | null> {
    const surveyResultsCollection = await MongoHelper.getCollection('surveyResults');

    const { value: document } = await surveyResultsCollection.findOneAndUpdate(
      { surveyId: surveyResultData.surveyId, accountId: surveyResultData.accountId },
      { $set: surveyResultData },
      { upsert: true, returnDocument: 'after' },
    );

    return MongoHelper.parseDocument<SurveyResultModel>(document);
  }
}
