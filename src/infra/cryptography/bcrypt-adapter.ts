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
}
