import { type LoadSurveyById, type HttpRequest, forbidden, InvalidParamError } from '.';
import { mockLoadSurveyById } from '@/presentation/test';
import { LoadSurveyResultController } from './load-survey-result-controller';

const makeFakeRequest = (): HttpRequest => ({
  params: { surveyId: 'any_survey_id' },
});

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyByIdStub: LoadSurveyById;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const sut = new LoadSurveyResultController(loadSurveyByIdStub);

  return { sut, loadSurveyByIdStub };
};

describe('LoadSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');

    await sut.handle(makeFakeRequest());

    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });
});
