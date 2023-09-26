import { type SaveSurveyResultRepository } from '.';
import MockDate from 'mockdate';
import { DbSaveSurveyResult } from './db-save-survey-result';
import { mockSaveSurveyResultRepository } from '@/data/test';
import { mockSaveSurveyResultParams, mockSurveyResultModel } from '@/domain/test';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);

  return { sut, saveSurveyResultRepositoryStub };
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

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();

    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(
      new Promise((_resolve, reject) => {
        reject(new Error());
      }),
    );

    const promise = sut.save(mockSaveSurveyResultParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return a SurveyResult on success', async () => {
    const { sut } = makeSut();

    const surveyResult = await sut.save(mockSaveSurveyResultParams());

    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
