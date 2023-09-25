import { type LoadSurveysRepository, type AddSurveyRepository } from '@/data/protocols';
import { type SurveyModel } from '@/domain/models';
import { type LoadSurveyById, type AddSurveyModel } from '@/domain/usecases';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { ObjectId } from 'mongodb';

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyById {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');

    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys = await surveyCollection.find().toArray();

    return surveys.map(survey => MongoHelper.parseDocument<SurveyModel>(survey)) as SurveyModel[];
  }

  async loadById(id: string): Promise<SurveyModel | null> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });

    return MongoHelper.parseDocument<SurveyModel>(survey);
  }
}
