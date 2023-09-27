import {
  type AddAccountRepository,
  type LoadAccountByEmailRepository,
  type LoadAccountByTokenRepository,
  type UpdateAccessTokenRepository,
} from '@/data/protocols';
import { type AddAccountParams } from '@/domain/usecases';
import { type AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(_accountData: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(_email: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken(_token: string, _role?: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken(_id: string, _token: string): Promise<void> {
      await Promise.resolve();
    }
  }
  return new UpdateAccessTokenRepositoryStub();
};
