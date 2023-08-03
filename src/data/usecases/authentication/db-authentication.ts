import { type AuthenticationModel, type Authentication } from '../../../domain/usecases/authentication';
import { type HashComparer } from '../../protocols/cryptography/hash-comparer';
import { type LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
  }

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email);

    if (account) {
      await this.hashComparer.compare(authentication.password, account.password);
    }

    return null;
  }
}
