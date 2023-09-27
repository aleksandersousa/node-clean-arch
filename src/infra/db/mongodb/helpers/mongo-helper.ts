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

  parseDocument<T>(collection: WithId<Document> | null): T | null {
    if (!collection) {
      return null;
    }

    const { _id, ...account } = { ...collection, id: collection._id.toHexString() };
    return account as T;
  },

  parseDocuments<T>(collection: Array<WithId<Document>> | null): T[] | null {
    if (!collection) {
      return null;
    }

    const mappedCollection = collection.map(c => MongoHelper.parseDocument<T>(c)) as T[];

    return mappedCollection;
  },
};
