import {
  type AddAccountRepository,
  type AccountModel,
  type AddAccountModel,
  type Hasher,
  type LoadAccountByEmailRepository,
} from '.';
import { DbAddAccount } from './db-add-account';

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(_value: string): Promise<string> {
      return await new Promise(resolve => {
        resolve('hashed_password');
      });
    }
  }

  return new HasherStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(_accountData: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => {
        resolve(makeFakeAccount());
      });
    }
  }

  return new AddAccountRepositoryStub();
};

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(_email: string): Promise<AccountModel | null> {
      return await new Promise(resolve => {
        resolve(null);
      });
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password',
});

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password',
});

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub);

  return { sut, hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub };
};

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();

    const hashSpy = jest.spyOn(hasherStub, 'hash');

    await sut.add(makeFakeAccountData());

    expect(hashSpy).toHaveBeenCalledWith('valid_password');
  });

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();

    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(
      new Promise((_resolve, reject) => {
        reject(new Error());
      }),
    );

    const promise = sut.add(makeFakeAccountData());

    await expect(promise).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    await sut.add(makeFakeAccountData());

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'hashed_password',
    });
  });

  test('Should throw if Hasher throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((_resolve, reject) => {
        reject(new Error());
      }),
    );

    const promise = sut.add(makeFakeAccountData());

    await expect(promise).rejects.toThrow();
  });

  test('Should returns an account on success', async () => {
    const { sut } = makeSut();

    const account = await sut.add(makeFakeAccountData());

    expect(account).toEqual(makeFakeAccount());
  });

  test('Should returns null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(
      new Promise(resolve => {
        resolve(makeFakeAccount());
      }),
    );

    const account = await sut.add(makeFakeAccountData());

    expect(account).toBeNull();
  });

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');

    await sut.add(makeFakeAccountData());

    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@email.com');
  });
});
