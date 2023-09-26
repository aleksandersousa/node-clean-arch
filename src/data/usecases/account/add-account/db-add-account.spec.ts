/* eslint-disable @typescript-eslint/promise-function-async */
import { mockAddAccountRepository, mockHasher, mockLoadAccountByEmailRepository } from '@/data/test';
import { mockAccountModel, mockAddAccountParams, throwError } from '@/domain/test';
import { type AddAccountRepository, type Hasher, type LoadAccountByEmailRepository } from '.';
import { DbAddAccount } from './db-add-account';

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher();
  const addAccountRepositoryStub = mockAddAccountRepository();
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(
    new Promise(resolve => {
      resolve(null);
    }),
  );

  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub);

  return { sut, hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub };
};

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();

    const hashSpy = jest.spyOn(hasherStub, 'hash');

    await sut.add(mockAddAccountParams());

    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();

    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError);

    await expect(sut.add(mockAddAccountParams())).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    await sut.add(mockAddAccountParams());

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'hashed_password',
    });
  });

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError);

    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should returns an account on success', async () => {
    const { sut } = makeSut();

    const account = await sut.add(mockAddAccountParams());

    expect(account).toEqual(mockAccountModel());
  });

  test('Should returns null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(
      new Promise(resolve => {
        resolve(mockAccountModel());
      }),
    );

    const account = await sut.add(mockAddAccountParams());

    expect(account).toBeNull();
  });

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');

    await sut.add(mockAddAccountParams());

    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@email.com');
  });
});
