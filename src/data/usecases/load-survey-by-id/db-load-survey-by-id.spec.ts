import { type LoadSurveyByIdRepository, type SurveyModel, type LoadSurveyById } from '.';
import { DbLoadSurveyById } from './db-load-survey-by-id';
import MockDate from 'mockdate';

const makeFakeSurvey = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
    date: new Date(),
  };
};

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<SurveyModel | null> {
      return await new Promise(resolve => {
        resolve(makeFakeSurvey());
      });
    }
  }

  return new LoadSurveyByIdRepositoryStub();
};

type SutTypes = {
  sut: LoadSurveyById;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository();
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

    expect(survey).toEqual(makeFakeSurvey());
  });

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();

    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(
      new Promise((_resolve, reject) => {
        reject(new Error());
      }),
    );

    const promise = sut.loadById('any_id');

    await expect(promise).rejects.toThrow();
  });
});
