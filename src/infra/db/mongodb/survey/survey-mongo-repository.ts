import { type LoadSurveysRepository, type AddSurveyRepository } from '@/data/protocols';
import { type SurveyModel } from '@/domain/models';
import { type LoadSurveyById, type AddSurveyParams } from '@/domain/usecases';
import { MongoHelper, QueryBuilder } from '@/infra/db/mongodb/helpers';
import { ObjectId } from 'mongodb';

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyById {
  async add(surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');

    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(accountId: string): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');

    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result',
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: '$result',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.accountId', new ObjectId(accountId)],
                  },
                },
              },
            },
            1,
          ],
        },
      })
      .build();

    const surveys = await surveyCollection.aggregate(query).toArray();
    return MongoHelper.parseDocuments<SurveyModel>(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });

    return MongoHelper.parseDocument<SurveyModel>(survey) as SurveyModel;
  }
}
