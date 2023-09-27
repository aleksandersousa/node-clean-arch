import { type LoadSurveysRepository, type AddSurveyRepository } from '@/data/protocols';
import { type SurveyModel } from '@/domain/models';
import { type LoadSurveyById, type AddSurveyParams } from '@/domain/usecases';
import { MongoHelper } from '@/infra/db/mongodb/helpers';
import { ObjectId } from 'mongodb';

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyById {
  async add(surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');

    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys = await surveyCollection.find().toArray();

    return MongoHelper.parseDocuments<SurveyModel>(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });

    return MongoHelper.parseDocument<SurveyModel>(survey) as SurveyModel;
  }
}
