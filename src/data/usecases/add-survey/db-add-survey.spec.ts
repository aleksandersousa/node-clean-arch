import { type AddSurveyModel, type AddSurveyRepository } from '.';
import { DbAddSurvey } from './db-add-survey';

const makeAddSurveyRespository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(_surveyData: AddSurveyModel): Promise<void> {
      await new Promise<void>(resolve => {
        resolve();
      });
    }
  }

  return new AddSurveyRepositoryStub();
};

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{ image: 'any_image', answer: 'any_answer' }],
});

interface SutTypes {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRespository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);

  return { sut, addSurveyRepositoryStub };
};

describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');

    const surveyData = makeFakeSurveyData();

    await sut.add(surveyData);

    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });
});
