import { type Collection } from 'mongodb';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { SurveyResultMongoRepository } from './survey-result-mongo-repository';
import { type AccountModel, type SurveyModel } from '@/domain/models';

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const makeAccount = async (): Promise<AccountModel | null> => {
  const insertedDocument = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    date: new Date(),
  });

  const document = await accountCollection.findOne({ _id: insertedDocument.insertedId });

  return MongoHelper.parseDocument<AccountModel>(document);
};

const makeSurvey = async (): Promise<SurveyModel | null> => {
  const insertedDocument = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{ image: 'any_image', answer: 'any_answer' }, { answer: 'other_answer' }],
    date: new Date(),
  });

  const document = await surveyCollection.findOne({ _id: insertedDocument.insertedId });

  return MongoHelper.parseDocument<SurveyModel>(document);
};

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository();
};

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(globalThis.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});

    surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    await surveyResultCollection.deleteMany({});

    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut();
      const survey = await makeSurvey();
      const account = await makeAccount();

      const surveyResult = await sut.save({
        surveyId: survey?.id as string,
        accountId: account?.id as string,
        answer: survey?.answers[0]?.answer as string,
        date: new Date(),
      });

      expect(surveyResult).toBeTruthy();
      expect(surveyResult?.id).toBeTruthy();
      expect(surveyResult?.answer).toBe(survey?.answers[0]?.answer);
    });
  });
});
