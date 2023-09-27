import { type LoadSurveyResultRepository, type SaveSurveyResultRepository } from '.';
import MockDate from 'mockdate';
import { DbSaveSurveyResult } from './db-save-survey-result';
import { mockLoadSurveyResultRepository, mockSaveSurveyResultRepository } from '@/data/test';
import { mockSaveSurveyResultParams, mockSurveyResultModel, throwError } from '@/domain/test';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub);

  return { sut, saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub };
};

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const surveyData = mockSaveSurveyResultParams();

    await sut.save(surveyData);

    expect(saveSpy).toHaveBeenCalledWith(surveyData);
  });

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId');
    const surveyData = mockSaveSurveyResultParams();

    await sut.save(surveyData);

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyData.surveyId);
  });

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();

    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError);

    const promise = sut.save(mockSaveSurveyResultParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();

    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError);

    const promise = sut.save(mockSaveSurveyResultParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return a SurveyResult on success', async () => {
    const { sut } = makeSut();

    const surveyResult = await sut.save(mockSaveSurveyResultParams());

    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
