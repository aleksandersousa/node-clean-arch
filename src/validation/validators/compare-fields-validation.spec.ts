import { InvalidParamError } from '../../presentation/errors';
import { CompareFieldsValidation } from './compare-fields-validation';

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation('any_field', 'field_to_compare');

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut();

    const error = sut.validate({ any_field: 'any_field', field_to_compare: 'differente_value' });

    expect(error).toEqual(new InvalidParamError('field_to_compare'));
  });
});

describe('CompareFields Validation', () => {
  test('Should not return if validation succeeds', () => {
    const sut = makeSut();

    const error = sut.validate({ any_field: 'any_field', field_to_compare: 'any_field' });

    expect(error).toBeFalsy();
  });
});
