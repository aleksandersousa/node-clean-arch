import { type LoadAccountByToken, type AccountModel, type Decrypter } from '.';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    await this.decrypter.decrypt(accessToken);

    return await new Promise(resolve => {
      resolve(null);
    });
  }
}
