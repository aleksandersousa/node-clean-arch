import { type AuthenticationModel, type Authentication } from '../../../domain/usecases/authentication';
import { type LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository';

export class DbAuthentication implements Authentication {
  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    await this.loadAccountByEmailRepository.load(authentication.email);
    return null;
  }
}
