import { type Encrypter } from '../../../data/protocols';
import jwt from 'jsonwebtoken';

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {
    this.secret = secret;
  }

  async encrypt(value: string): Promise<string> {
    jwt.sign({ id: value }, this.secret);
    return '';
  }
}
