import { ObjectId } from 'mongodb';
import { type LoadAccountByEmailRepository, type AddAccountRepository } from '../../../../data/protocols';
import { type AccountModel } from '../../../../domain/models';
import { type AddAccountModel } from '../../../../domain/usecases';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');

    const { value: document } = await accountCollection.findOneAndUpdate(
      { _id: new ObjectId() },
      { $setOnInsert: accountData },
      { upsert: true, returnDocument: 'after' },
    );

    return MongoHelper.parseDocument<AccountModel>(document) as AccountModel;
  }

  async loadByEmail(email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email });

    return MongoHelper.parseDocument<AccountModel>(account);
  }
}
