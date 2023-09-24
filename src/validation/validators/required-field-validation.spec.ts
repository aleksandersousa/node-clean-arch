import { MissingParamError } from '@/presentation/errors';
import { RequiredFieldValidation } from './required-field-validation';

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('any_field');

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut();

    const error = sut.validate({ any_other_field: 'any_other_field' });

    expect(error).toEqual(new MissingParamError('any_field'));
  });
});

describe('RequiredField Validation', () => {
  test('Should not return if validation succeeds', () => {
    const sut = makeSut();

    const error = sut.validate({ any_field: 'any_other_field' });

    expect(error).toBeFalsy();
  });
});
