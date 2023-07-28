import { type AddAccountRepository, type AccountModel, type AddAccount, type AddAccountModel, type Encrypter } from '.';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const account = await this.addAccountRepository.add({ ...accountData, password: hashedPassword });

    return await new Promise(resolve => {
      resolve(account);
    });
  }
}
