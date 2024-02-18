import { handleBackendError } from './helpers';

describe('Signup error handler', () => {
  test('Signup error handler', () => {
    expect(handleBackendError({ errorMessage: 'abc' })).toBe('abc');
    expect(handleBackendError({ error: { message: 'abc' } })).toBe('abc');
    expect(
      handleBackendError({ errors: { body: { 0: { message: 'abc' } } } }),
    ).toBe('abc');
    expect(handleBackendError({ errors: { message: { 0: 'abc' } } })).toBe(
      'An error has occurred',
    );
    expect(handleBackendError({ unhandledError: 'abc' })).toBe(
      'An error has occurred',
    );
    expect(handleBackendError('An error has occurred')).toBe(undefined);
    expect(handleBackendError({ message: 'abc' })).toBe(undefined);
    expect(handleBackendError({ success: 'abc' })).toBe(undefined);
  });
});
