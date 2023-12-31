import {
  type AddAccountRepository,
  type AccountModel,
  type AddAccount,
  type AddAccountParams,
  type Hasher,
  type LoadAccountByEmailRepository,
} from '.';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async add(accountData: AddAccountParams): Promise<AccountModel | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email);

    if (account) {
      return null;
    }

    const hashedPassword = await this.hasher.hash(accountData.password);
    const newAccount = await this.addAccountRepository.add({ ...accountData, password: hashedPassword });

    return newAccount;
  }
}
