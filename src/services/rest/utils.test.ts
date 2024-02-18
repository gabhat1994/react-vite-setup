import parseAxiosError from '@/services/rest/utils';

vi.mock('axios');

describe('Test Axios Error messages', () => {
  test('Axios error handler', () => {
    expect(parseAxiosError({ error: { message: 'abc' } })).toEqual({
      errorMessage: 'Unknown Error',
      errorStatus: null,
    });
    expect(parseAxiosError({ error: { message: 'abc', status: 401 } })).toEqual(
      { errorMessage: 'Unknown Error', errorStatus: null },
    );
  });
});
