import { type AuthenticationModel, type Authentication } from '../../../domain/usecases/authentication';
import { type HashComparer } from '../../protocols/cryptography/hash-comparer';
import { type TokenGenerator } from '../../protocols/cryptography/token-generator';
import { type LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository';
import { type UpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
    this.tokenGenerator = tokenGenerator;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email);

    if (account) {
      const isPasswordValid = await this.hashComparer.compare(authentication.password, account.password);

      if (isPasswordValid) {
        const accessToken = await this.tokenGenerator.generate(account.id);
        await this.updateAccessTokenRepository.update(account.id, accessToken);
        return accessToken;
      }
    }

    return null;
  }
}
