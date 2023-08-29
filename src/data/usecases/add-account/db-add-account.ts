import {
  type AddAccountRepository,
  type AccountModel,
  type AddAccount,
  type AddAccountModel,
  type Hasher,
  type LoadAccountByEmailRepository,
} from '.';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email);

    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add({ ...accountData, password: hashedPassword });

    return await new Promise(resolve => {
      resolve(account);
    });
  }
}
