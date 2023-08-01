import { type Validation } from './validation';
import { ValidationComposite } from './validation-composite';

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(_input: any): Error | null {
      // const x = new MissingParamError('test');
      return null;
    }
  }

  return new ValidationStub();
};

interface SutTypes {
  validationStub: Validation;
  sut: ValidationComposite;
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();
  const sut = new ValidationComposite([validationStub]);

  return { sut, validationStub };
};

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());

    const error = sut.validate({ field: 'any_value' });

    expect(error).toEqual(new Error());
  });
});
