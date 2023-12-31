import { type AccountModel } from '@/domain/models';

export interface LoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<AccountModel | null>;
}
