import { type LoadSurveyByIdRepository, type LoadSurveyResultRepository } from '@/data/protocols';
import { mockLoadSurveyByIdRepository, mockLoadSurveyResultRepository } from '@/data/test';
import { DbLoadSurveyResult } from './db-load-survey-result';
import { mockSurveyResultModel, throwError } from '@/domain/test';
import MockDate from 'mockdate';

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub);

  return { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub };
};

describe('DbLoadSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId');

    await sut.load('any_survey_id', 'any_account_id');

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id', 'any_account_id');
  });

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();

    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError);

    const promise = sut.load('any_survey_id', 'any_account_id');

    await expect(promise).rejects.toThrow();
  });

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null));
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');

    await sut.load('any_survey_id', 'any_account_id');

    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('Should return LoadSurveyResultModel with all answers with count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null));

    const surveyResult = await sut.load('any_survey_id', 'any_account_id');

    expect(surveyResult).toEqual(mockSurveyResultModel());
  });

  test('Should return SurveyResultModel on success', async () => {
    const { sut } = makeSut();

    const surveyResult = await sut.load('any_survey_id', 'any_account_id');

    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
