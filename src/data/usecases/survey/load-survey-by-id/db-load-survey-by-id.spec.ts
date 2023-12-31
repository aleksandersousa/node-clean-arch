import { mockLoadSurveyByIdRepository } from '@/data/test';
import { type LoadSurveyByIdRepository, type LoadSurveyById } from '.';
import { DbLoadSurveyById } from './db-load-survey-by-id';
import MockDate from 'mockdate';
import { mockSurveyModel, throwError } from '@/domain/test';

type SutTypes = {
  sut: LoadSurveyById;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);

  return { sut, loadSurveyByIdRepositoryStub };
};

describe('DbLoadSurveyById', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyByIdRepository with correct values', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');

    await sut.loadById('any_id');

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return a Survey on success', async () => {
    const { sut } = makeSut();

    const survey = await sut.loadById('any_id');

    expect(survey).toEqual(mockSurveyModel());
  });

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();

    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError);

    const promise = sut.loadById('any_id');

    await expect(promise).rejects.toThrow();
  });
});
