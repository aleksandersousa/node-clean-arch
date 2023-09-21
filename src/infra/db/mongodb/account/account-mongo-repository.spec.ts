import { type Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account-mongo-repository';
import { type AddAccountModel } from '../../../../domain/usecases';

const makeFakeAddAccount = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password',
});

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

let accountCollection: Collection;

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(globalThis.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    accountCollection.deleteMany({});
  });

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut();
      const account = await sut.add(makeFakeAddAccount());

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@email.com');
      expect(account.password).toBe('any_password');
    });
  });

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut();
      await accountCollection.insertOne(makeFakeAddAccount());

      const account = await sut.loadByEmail('any_email@email.com');

      expect(account).toBeTruthy();
      expect(account?.id).toBeTruthy();
      expect(account?.name).toBe('any_name');
      expect(account?.email).toBe('any_email@email.com');
      expect(account?.password).toBe('any_password');
    });

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut();

      const account = await sut.loadByEmail('any_email@email.com');

      expect(account).toBeFalsy();
    });
  });

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut();
      const document = await accountCollection.insertOne(makeFakeAddAccount());
      let account = await accountCollection.findOne({ _id: document.insertedId });

      expect(account?.accessToken).toBeFalsy();

      await sut.updateAccessToken(document.insertedId.toHexString(), 'any_token');
      account = await accountCollection.findOne({ _id: document.insertedId });

      expect(account).toBeTruthy();
      expect(account?.accessToken).toBe('any_token');
    });
  });
});
