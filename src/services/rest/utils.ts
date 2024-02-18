import axios, { type AxiosError } from 'axios';
import BlockedError from './errors/BlockedError';
import { type ResponseError, type ResponseSuccess } from './types';

const parseAxiosError = (
  error: AxiosError | BlockedError | unknown,
): { errorMessage: string; errorStatus: number | null } => {
  if (error instanceof BlockedError) {
    return { errorMessage: 'You are in a blocked country', errorStatus: 102 };
  }

  if (axios.isCancel(error)) {
    return { errorMessage: 'Canceled', errorStatus: null };
  }
  if (!axios.isAxiosError(error)) {
    return { errorMessage: 'Unknown Error', errorStatus: null };
  }

  let status: number | null = null;
  let message = 'Network Error';

  if (error.message) {
    message = error.message;
  }

  if (error.response) {
    status = error.response.status;
    switch (status) {
      case 401:
        message = 'Unauthorized';
        break;
      case 403:
        message = 'Forbidden';
        break;
      case 404:
        message = 'Not Found';
        break;
      case 405:
        message = 'Method Not Allowed';
        break;
      case 429:
        message = 'Too Many Requests';
        break;
      case 500:
        message = 'Internal Server Error';
        break;
      case 502:
        message = 'Bad Gateway';
        break;
      case 503:
        message = 'Service Unavailable';
        break;
      case 504:
        message = 'Gateway Timeout';
        break;
    }
    if (
      error.response?.data?.errors &&
      error.response?.data?.errors?.body?.[0].message
    ) {
      message = error.response?.data?.errors?.body[0]?.message;
    } else if (
      error.response?.data?.message ||
      error.response?.data?.error?.message
    ) {
      message =
        error.response.data.message || error.response.data.error.message;
    }
  }

  return { errorMessage: message, errorStatus: status };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isResponseError(response: any): response is ResponseError {
  return response && 'errorMessage' in response;
}
export function generateSuccessResponse<T extends Record<string, unknown>>(
  response: T,
): ResponseSuccess<T> {
  return {
    ...response,
    isSuccess: true,
  };
}

export default parseAxiosError;
