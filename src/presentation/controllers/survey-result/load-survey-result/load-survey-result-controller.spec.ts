import { type LoadSurveyById, type HttpRequest, forbidden, InvalidParamError, serverError, ok } from '.';
import { mockLoadSurveyById } from '@/presentation/test';
import { LoadSurveyResultController } from './load-survey-result-controller';
import { mockSurveyResultModel, throwError } from '@/domain/test';
import { type LoadSurveyResultRepository } from '@/data/protocols';
import { mockLoadSurveyResultRepository } from '@/data/test';
import MockDate from 'mockdate';

const makeFakeRequest = (): HttpRequest => ({
  params: { surveyId: 'any_id' },
});

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyByIdStub: LoadSurveyById;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultRepositoryStub);

  return { sut, loadSurveyByIdStub, loadSurveyResultRepositoryStub };
};

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');

    await sut.handle(makeFakeRequest());

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId');

    await sut.handle(makeFakeRequest());

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return LoadSurveyResultModel on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(ok(mockSurveyResultModel()));
  });
});
