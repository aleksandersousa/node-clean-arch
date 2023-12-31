import { type Validation } from '@/presentation/protocols/validation';

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(_input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};
