import bcrypt from 'bcrypt';
import { BcryptAdpater } from './bcrypt-adapter';

describe('Bcrypt Adapter', () => {
  test('Should Bcrypt with correct values', async () => {
    const salt = 12;
    const sut = new BcryptAdpater(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt('any_value');

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
});
