import { type LogErrorRepository } from '@/data/protocols';

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(_stack: string): Promise<void> {
      await new Promise<void>(resolve => {
        resolve();
      });
    }
  }
  return new LogErrorRepositoryStub();
};
