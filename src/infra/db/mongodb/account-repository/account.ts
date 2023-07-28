import { ObjectId } from 'mongodb';
import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { type AccountModel } from '../../../../domain/models';
import { type AddAccountModel } from '../../../../domain/usecases';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');

    const { value: document } = await accountCollection.findOneAndUpdate(
      { _id: new ObjectId() },
      { $setOnInsert: accountData },
      { upsert: true, returnDocument: 'after' },
    );

    const { _id, ...account } = { ...document, id: document?._id.toHexString() };

    return account as unknown as AccountModel;
  }
}
