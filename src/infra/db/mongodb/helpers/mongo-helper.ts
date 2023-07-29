import { type Collection, MongoClient, type WithId, type Document } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient | null,
  uri: null as unknown as string,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
    this.uri = uri;
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri);
    }

    return this.client.db().collection(name);
  },

  mapMongoDocument<T>(collection: WithId<Document> | null): T {
    const { _id, ...account } = { ...collection, id: collection?._id.toHexString() };
    return account as T;
  },
};
