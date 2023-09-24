import { type LogErrorRespository } from '@/data/protocols';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';

export class LogMongoRepository implements LogErrorRespository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors');
    errorCollection.insertOne({ stack, date: new Date() });
  }
}
