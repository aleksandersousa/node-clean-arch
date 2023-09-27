import {
  type AddAccount,
  type AddAccountParams,
  type Authentication,
  type AuthenticationParams,
  type LoadAccountByToken,
} from '@/domain/usecases';
import { type AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(_account: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountStub();
};

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(_authentication: AuthenticationParams): Promise<string> {
      return await Promise.resolve('any_token');
    }
  }
  return new AuthenticationStub();
};

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(_accessToken: string, _role?: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountByTokenStub();
};
