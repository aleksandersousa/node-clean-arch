import { ObjectId, type Collection } from 'mongodb';
import { MongoHelper } from '@/infra/db/mongodb/helpers';
import { SurveyMongoRepository } from './survey-mongo-repository';
import { mockAddAccountParams, mockAddSurveyParams } from '@/domain/test';

let accountCollection: Collection;
let surveyCollection: Collection;
let surveyResultCollection: Collection;

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams());
  return res.insertedId.toHexString();
};

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
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

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut();

      await sut.add(mockAddSurveyParams());

      const survey = await surveyCollection.findOne({ question: 'any_question' });

      expect(survey).toBeTruthy();
    });
  });

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const accountId = await mockAccountId();
      const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()];

      const result = await surveyCollection.insertMany(addSurveyModels);

      const survey = await surveyCollection.findOne({ _id: result.insertedIds[0] });
      await surveyResultCollection.insertOne({
        surveyId: survey?._id,
        accountId: new ObjectId(accountId),
        answer: survey?.answers[0].answer,
        date: new Date(),
      });

      const sut = makeSut();

      const surveys = await sut.loadAll(accountId);

      expect(surveys.length).toBe(2);
      expect(surveys[0].id).toBeTruthy();
      expect(surveys[0].question).toBe(addSurveyModels[0].question);
      expect(surveys[0].didAnswer).toBe(true);
      expect(surveys[1].question).toBe(addSurveyModels[1].question);
      expect(surveys[1].didAnswer).toBe(false);
    });

    test('Should load empty list', async () => {
      const sut = makeSut();

      const accountId = await mockAccountId();
      const surveys = await sut.loadAll(accountId);

      expect(surveys.length).toBe(0);
    });
  });

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const document = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer',
          },
        ],
        date: new Date(),
      });

      const sut = makeSut();

      const survey = await sut.loadById(document.insertedId.toHexString());

      expect(survey).toBeTruthy();
    });
  });
});
