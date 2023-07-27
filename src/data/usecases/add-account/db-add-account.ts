import { type AccountModel } from '../../../domain/models';
import { type AddAccount, type AddAccountModel } from '../../../domain/usecases';
import { type Encrypter } from '../../protocols/encrypter';

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);

    return await new Promise(resolve => {
      resolve({
        id: '',
        email: '',
        name: '',
        password: '',
      });
    });
  }
}
