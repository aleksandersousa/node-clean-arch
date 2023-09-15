import { type LoadAccountByToken, type AccountModel, type Decrypter } from '.';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    await this.decrypter.decrypt(accessToken);

    return await new Promise(resolve => {
      resolve({ id: 'any_id', email: 'any_email@email.com', name: 'any_name', password: 'any_password' });
    });
  }
}
