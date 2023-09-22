import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { type Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';
import env from '../config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@email.com',
    password: '12345',
    role: 'admin',
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
    surveyCollection.deleteMany({});

    accountCollection = await MongoHelper.getCollection('accounts');
    accountCollection.deleteMany({});
  });

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{ image: 'http://image-name.com', answer: 'Answer 1' }, { answer: 'Answer 2' }],
        })
        .expect(403);
    });

    test('Should return 204 on add survey with valid token', async () => {
      const accessToken = await makeAccessToken();

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{ image: 'http://image-name.com', answer: 'Answer 1' }, { answer: 'Answer 2' }],
        })
        .expect(204);
    });
  });

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app).get('/api/surveys').expect(403);
    });

    test('Should return 204 on load surveys that returns an empty list with valid token', async () => {
      const accessToken = await makeAccessToken();

      await request(app).get('/api/surveys').set('x-access-token', accessToken).expect(204);
    });
  });
});
