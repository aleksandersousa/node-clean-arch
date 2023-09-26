import { type AccountModel } from '@/domain/models';
import { type AddAccountParams, type AuthenticationParams } from '@/domain/usecases';

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password',
});

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@email.com',
  password: 'any_password',
});

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams(), { id: 'any_id' });
