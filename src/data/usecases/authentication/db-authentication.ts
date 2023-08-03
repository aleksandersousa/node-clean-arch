import { type AuthenticationModel, type Authentication } from '../../../domain/usecases/authentication';
import { type HashComparer } from '../../protocols/cryptography/hash-comparer';
import { type TokenGenerator } from '../../protocols/cryptography/token-generator';
import { type LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
    this.tokenGenerator = tokenGenerator;
  }

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email);

    if (account) {
      const isPasswordValid = await this.hashComparer.compare(authentication.password, account.password);

      if (isPasswordValid) {
        const accessToken = await this.tokenGenerator.generate(account.id);
        return accessToken;
      }
    }

    return null;
  }
}
