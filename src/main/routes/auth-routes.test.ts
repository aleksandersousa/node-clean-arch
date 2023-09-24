import { type Collection } from 'mongodb';
import request from 'supertest';
import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { type AddAccountModel } from '@/domain/usecases';
import { hash } from 'bcrypt';

let accountCollection: Collection;

const makeFakeAddAccount = async (): Promise<AddAccountModel> => {
  const password = await hash('any_password', 12);
  return {
    name: 'any_name',
    email: 'any_email@email.com',
    password,
  };
};

describe('Auth Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(globalThis.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({ name: 'Aleksander', email: 'aleksander@email.com', password: '123', passwordConfirmation: '123' })
        .expect(200);
    });
  });

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      await accountCollection.insertOne(await makeFakeAddAccount());

      await request(app)
        .post('/api/login')
        .send({ email: 'any_email@email.com', password: 'any_password' })
        .expect(200);
    });

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({ email: 'any_email@email.com', password: 'any_password' })
        .expect(401);
    });
  });
});
