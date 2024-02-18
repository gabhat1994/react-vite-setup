import { t } from 'i18next';

export const PARAMS = {
  Mode: 'mode',
  AccessToken: 'access_token',
  RefreshToken: 'refresh_token',
  ErrorCode: 'error_code',
};

export const Modes = {
  Signup: 'signup',
  Login: 'login',
};

export enum ErrorCodeEnum {
  USER_CANCELLED = 'user_cancelled',
  USER_CANCELLED_AUTHORIZE = 'user_cancelled_authorize',
  USER_CANCELLED_LOGIN = 'user_cancelled_login',
  USER_NOT_EXISTS = 'user_not_exists',
  CONTACT_SUPPORT = 'contact_support',
  GENERIC = 'generic',
}

// TODO: Update the correct message once available in Figma
export const ERROR_CODE_MAP = {
  [ErrorCodeEnum.USER_CANCELLED]: '',
  [ErrorCodeEnum.USER_NOT_EXISTS]: t(
    'noumena.social.auth.error.message.user_not_found',
  ),
  [ErrorCodeEnum.CONTACT_SUPPORT]: t(
    'noumena.social.auth.error.message.generic',
  ),
  [ErrorCodeEnum.GENERIC]: 'noumena.social.auth.error.message.generic',
};
