import request from 'supertest';
import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db/mongodb/helpers';
import { sign } from 'jsonwebtoken';
import env from '../config/env';
import { type Collection } from 'mongodb';

let surveyCollection: Collection;
let accountCollection: Collection;

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@email.com',
    password: '12345',
  });
  const id = res.insertedId;

  const accessToken = sign({ id }, env.jwtSecret);

  await accountCollection.updateOne({ _id: id }, { $set: { accessToken } });

  return accessToken;
};

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(globalThis.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});

    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer',
        })
        .expect(403);
    });

    test('Should return 200 on save survey with valid token', async () => {
      const accessToken = await makeAccessToken();
      const surveyInsertedDocument = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{ image: 'http://image-name.com', answer: 'Answer 1' }, { answer: 'Answer 2' }],
        date: new Date(),
      });

      await request(app)
        .put(`/api/surveys/${surveyInsertedDocument.insertedId.toHexString()}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1',
        })
        .expect(200);
    });
  });

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on load survey result without accessToken', async () => {
      await request(app).get('/api/surveys/any_id/results').expect(403);
    });

    test('Should return 200 on save survey with valid token', async () => {
      const accessToken = await makeAccessToken();
      const surveyInsertedDocument = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{ image: 'http://image-name.com', answer: 'Answer 1' }, { answer: 'Answer 2' }],
        date: new Date(),
      });

      await request(app)
        .get(`/api/surveys/${surveyInsertedDocument.insertedId.toHexString()}/results`)
        .set('x-access-token', accessToken)
        .expect(200);
    });
  });
});
