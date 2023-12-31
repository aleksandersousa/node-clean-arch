import { type Collection } from 'mongodb';
import { MongoHelper } from '@/infra/db/mongodb/helpers';
import { LogMongoRepository } from './log-mongo-repository';

const makeSut = (): LogMongoRepository => new LogMongoRepository();

describe('Log Mongo Respository', () => {
  let errorCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(globalThis.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.deleteMany({});
  });

  test('Should create an error log on success ', async () => {
    const sut = makeSut();
    await sut.logError('any_error');

    const count = await errorCollection.countDocuments();
    expect(count).toBe(1);
  });
});
