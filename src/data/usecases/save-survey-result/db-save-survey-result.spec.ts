import { type SaveSurveyResultModel, type SaveSurveyResultRepository, type SurveyResultModel } from '.';
import MockDate from 'mockdate';
import { DbSaveSurveyResult } from './db-save-survey-result';

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date(),
});

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: 'any_id',
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date(),
});

const makeSaveSurveyResultRespository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(_surveyResultData: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return await new Promise(resolve => {
        resolve(makeFakeSurveyResult());
      });
    }
  }

  return new SaveSurveyResultRepositoryStub();
};

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRespository();
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

    const surveyData = makeFakeSurveyResultData();

    await sut.save(surveyData);

    expect(saveSpy).toHaveBeenCalledWith(surveyData);
  });

  // test('Should throw if AddSurveyRepository throws', async () => {
  //   const { sut, addSurveyRepositoryStub } = makeSut();

  //   jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(
  //     new Promise((_resolve, reject) => {
  //       reject(new Error());
  //     }),
  //   );

  //   const promise = sut.add(makeFakeSurveyData());

  //   await expect(promise).rejects.toThrow();
  // });
});
