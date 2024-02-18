import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import parseAxiosError from '@/services/rest/utils';

const mock = new MockAdapter(axios);

describe('Error response utils', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('401', async () => {
    mock.onAny().reply(401, {
      error_status: 'boom....',
    });

    try {
      await axios.post('/', { x: 1 });
    } catch (err: unknown) {
      expect(parseAxiosError(err)).toEqual({
        errorMessage: 'Unauthorized',
        errorStatus: 401,
      });
    }
  });

  test('403', async () => {
    mock.onAny().reply(403, {
      error_status: 'boom....',
    });

    try {
      await axios.post('/', { x: 1 });
    } catch (err: unknown) {
      expect(parseAxiosError(err)).toEqual({
        errorMessage: 'Forbidden',
        errorStatus: 403,
      });
    }
  });

  test('404', async () => {
    mock.onAny().reply(404, {
      error_status: 'boom....',
    });

    try {
      await axios.post('/', { x: 1 });
    } catch (err: unknown) {
      expect(parseAxiosError(err)).toEqual({
        errorMessage: 'Not Found',
        errorStatus: 404,
      });
    }
  });

  test('405', async () => {
    mock.onAny().reply(405, {
      error_status: 'boom....',
    });

    try {
      await axios.post('/', { x: 1 });
    } catch (err: unknown) {
      expect(parseAxiosError(err)).toEqual({
        errorMessage: 'Method Not Allowed',
        errorStatus: 405,
      });
    }
  });

  test('429', async () => {
    mock.onAny().reply(429, {
      error_status: 'boom....',
    });

    try {
      await axios.post('/', { x: 1 });
    } catch (err: unknown) {
      expect(parseAxiosError(err)).toEqual({
        errorMessage: 'Too Many Requests',
        errorStatus: 429,
      });
    }
  });

  test('500', async () => {
    mock.onAny().reply(500, {
      error_status: 'boom....',
    });

    try {
      await axios.post('/', { x: 1 });
    } catch (err: unknown) {
      expect(parseAxiosError(err)).toEqual({
        errorMessage: 'Internal Server Error',
        errorStatus: 500,
      });
    }
  });

  test('502', async () => {
    mock.onAny().reply(502, {
      error_status: 'boom....',
    });

    try {
      await axios.post('/', { x: 1 });
    } catch (err: unknown) {
      expect(parseAxiosError(err)).toEqual({
        errorMessage: 'Bad Gateway',
        errorStatus: 502,
      });
    }
  });

  test('503', async () => {
    mock.onAny().reply(503, {
      error_status: 'boom....',
    });

    try {
      await axios.post('/', { x: 1 });
    } catch (err: unknown) {
      expect(parseAxiosError(err)).toEqual({
        errorMessage: 'Service Unavailable',
        errorStatus: 503,
      });
    }
  });

  test('504', async () => {
    mock.onAny().reply(504, {
      error_status: 'boom....',
    });

    try {
      await axios.post('/', { x: 1 });
    } catch (err: unknown) {
      expect(parseAxiosError(err)).toEqual({
        errorMessage: 'Gateway Timeout',
        errorStatus: 504,
      });
    }
  });
});
