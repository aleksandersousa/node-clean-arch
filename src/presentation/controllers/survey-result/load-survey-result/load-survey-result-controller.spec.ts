import {
  type LoadSurveyById,
  type HttpRequest,
  forbidden,
  InvalidParamError,
  serverError,
  ok,
  type LoadSurveyResult,
} from '.';
import { mockLoadSurveyById, mockLoadSurveyResult } from '@/presentation/test';
import { LoadSurveyResultController } from './load-survey-result-controller';
import { mockSurveyResultModel, throwError } from '@/domain/test';
import MockDate from 'mockdate';

const mockRequest = (): HttpRequest => ({
  params: { surveyId: 'any_id' },
  accountId: 'any_account_id',
});

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyByIdStub: LoadSurveyById;
  loadSurveyResultStub: LoadSurveyResult;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const loadSurveyResultStub = mockLoadSurveyResult();
  const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultStub);

  return { sut, loadSurveyByIdStub, loadSurveyResultStub };
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

    await sut.handle(mockRequest());

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load');

    await sut.handle(mockRequest());

    expect(loadSpy).toHaveBeenCalledWith('any_id', 'any_account_id');
  });

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null));

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(throwError);

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return LoadSurveyResultModel on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(ok(mockSurveyResultModel()));
  });
});
