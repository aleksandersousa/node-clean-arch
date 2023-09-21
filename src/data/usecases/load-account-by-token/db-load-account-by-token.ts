import { type LoadAccountByToken, type AccountModel, type Decrypter, type LoadAccountByTokenRepository } from '.';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
  ) {}

  async load(accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken);
    if (token) {
      await this.loadAccountByTokenRepository.loadByToken(token, role);
    }

    return await new Promise(resolve => {
      resolve(null);
    });
  }
}
