import { type LogErrorRepository } from '@/data/protocols';

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(_stack: string): Promise<void> {
      await Promise.resolve();
    }
  }
  return new LogErrorRepositoryStub();
};
