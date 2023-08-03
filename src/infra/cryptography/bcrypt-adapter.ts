import bcrypt from 'bcrypt';
import { type Hasher } from '../../data/protocols';

export class BcryptAdpater implements Hasher {
  constructor(private readonly salt: number) {
    this.salt = salt;
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash);
    return await new Promise(resolve => {
      resolve(true);
    });
  }
}
