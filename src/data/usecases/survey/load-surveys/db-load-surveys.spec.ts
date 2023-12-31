import { mockLoadSurveysRepository } from '@/data/test';
import { type LoadSurveysRepository, type LoadSurveys } from '.';
import { DbLoadSurveys } from './db-load-surveys';
import MockDate from 'mockdate';
import { mockSurveyModels, throwError } from '@/domain/test';

type SutTypes = {
  sut: LoadSurveys;
  loadSurveysRepositoryStub: LoadSurveysRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);

  return { sut, loadSurveysRepositoryStub };
};

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');

    await sut.load('any_account_id');

    expect(loadAllSpy).toHaveBeenCalled();
  });

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut();

    const surveys = await sut.load('any_account_id');

    expect(surveys).toEqual(mockSurveyModels());
  });

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();

    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError);

    const promise = sut.load('any_account_id');

    await expect(promise).rejects.toThrow();
  });
});
