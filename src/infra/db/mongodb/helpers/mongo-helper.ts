import { type Collection, MongoClient, type WithId, type Document } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient | null,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  mapMongoDocument<T>(collection: WithId<Document> | null): T {
    const { _id, ...account } = { ...collection, id: collection?._id.toHexString() };
    return account as T;
  },
};
