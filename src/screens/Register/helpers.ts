import { get } from 'lodash';
import { t } from 'i18next';

const convertedMessages: { [key: string]: string } = {
  'Invalid OTP, Please try again!': t`noumena.resend_otp_invalid_code.text`,
};

export const handleBackendError = (
  resWithError: unknown,
  defaultMessage?: string,
) => {
  const m1 = get(resWithError, 'errors.body.0.message');
  const m2 = get(resWithError, 'errors.messages.0');
  const m3 = get(resWithError, 'error.message');
  const m4 = get(resWithError, 'message');
  const m5 = get(resWithError, 'errorMessage');

  const message = m1 || m2 || m3 || m4 || m5;
  const error = get(resWithError, 'error');
  const errors = get(resWithError, 'errors');
  const errorMessage = get(resWithError, 'errorMessage');
  const unhandledError = get(resWithError, 'unhandledError');

  const errorMsg =
    error || errors || errorMessage || unhandledError
      ? message || defaultMessage || t`noumena.generic.error`
      : undefined;

  return errorMsg && convertedMessages[errorMsg]
    ? convertedMessages[errorMsg]
    : errorMsg;
};
