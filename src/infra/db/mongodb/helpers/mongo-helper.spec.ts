import { MongoHelper as sut } from '.';

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(globalThis.__MONGO_URI__);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();

    await sut.disconnect();

    accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
  });
});
