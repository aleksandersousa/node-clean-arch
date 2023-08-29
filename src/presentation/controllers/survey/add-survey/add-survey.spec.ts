import { type Validation, type HttpRequest, type AddSurvey, type AddSurveyModel } from '.';
import { MissingParamError } from '../../../errors';
import { badRequest } from '../../../helpers/http/http-helper';
import { AddSurveyController } from './add-survey-controller';

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(_input: any): Error | null {
      return null;
    }
  }

  return new ValidationStub();
};
const makeAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(_data: AddSurveyModel): Promise<void> {
      await new Promise<void>(resolve => {
        resolve();
      });
    }
  }

  return new AddSurveyStub();
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
  },
});

interface SutTypes {
  sut: AddSurveyController;
  validationStub: Validation;
  addSurveyStub: AddSurvey;
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();
  const addSurveyStub = makeAddSurvey();
  const sut = new AddSurveyController(validationStub, addSurveyStub);

  return { sut, validationStub, addSurveyStub };
};

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyStub, 'add');
    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});