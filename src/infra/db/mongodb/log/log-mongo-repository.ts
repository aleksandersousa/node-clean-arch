import { type LogErrorRepository } from '@/data/protocols';
import { MongoHelper } from '@/infra/db/mongodb/helpers';

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors');
    errorCollection.insertOne({ stack, date: new Date() });
  }
}
