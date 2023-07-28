import bcrypt from 'bcrypt';
import { type Encrypter } from '../../data/protocols/encrypter';

export class BcryptAdpater implements Encrypter {
  constructor(private readonly salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    await bcrypt.hash(value, this.salt);
    return '';
  }
}
