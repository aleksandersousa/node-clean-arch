import { type Hasher, type HashComparer, type Encrypter, type Decrypter } from '@/data/protocols';

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(_value: string): Promise<string> {
      return await Promise.resolve('hashed_password');
    }
  }
  return new HasherStub();
};

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(_token: string): Promise<string> {
      return await Promise.resolve('any_value');
    }
  }
  return new DecrypterStub();
};

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(_value: string): Promise<string> {
      return await Promise.resolve('any_token');
    }
  }
  return new EncrypterStub();
};

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(_value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true);
    }
  }
  return new HashComparerStub();
};
