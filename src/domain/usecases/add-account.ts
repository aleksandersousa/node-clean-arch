import { type AccountModel } from '@/domain/models';

export type AddAccountModel = Omit<AccountModel, 'id'>;

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel | null>;
}
