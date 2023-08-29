import { type Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { type AddSurveyModel } from '../../../../domain/usecases';
import { SurveyMongoRepository } from './survey-mongo-repository';

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{ image: 'any_image', answer: 'any_answer' }, { answer: 'other_answer' }],
});

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
};

let surveyCollection: Collection;

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(globalThis.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    surveyCollection.deleteMany({});
  });

  test('Should add a survey on success', async () => {
    const sut = makeSut();

    await sut.add(makeFakeSurveyData());

    const survey = await surveyCollection.findOne({ question: 'any_question' });

    expect(survey).toBeTruthy();
  });
});
