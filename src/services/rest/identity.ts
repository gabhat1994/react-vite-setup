import axios from 'axios';
import { pickBy, identity, isString } from 'lodash';
import * as Sentry from '@sentry/react';
import {
  type QuickSignUpValues,
  type SignUpValues,
} from '@/screens/Register/types';
import getApiUrl from '@/apollo/getApiUrl';
import { setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { CloudFlareService } from './cloudFlareService';
import parseAxiosError, { generateSuccessResponse } from './utils';
import {
  type Response,
  type ResetPassword,
  type NonNoumenaSignupPayload,
  type VerifyPasswordOtp,
} from './types';

const API_URL = `${getApiUrl()}/user/v1`;
const REFERRAL_API_URL = `${getApiUrl()}/referral/v1`;

const getLoginPhone = (token: string | null, recaptchaDisabled = false) =>
  `${API_URL}/otp/login-phone${
    isString(token) || recaptchaDisabled ? '-v2' : ''
  }`;
const getLoginEmail = (token: string | null, recaptchaDisabled = false) =>
  `${API_URL}/otp/login-email${
    isString(token) || recaptchaDisabled ? '-v2' : ''
  }`;

type VerifyWithOneTimeTokenResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
};

export const IdentityServices = {
  signInPhone: async (phone: string, token: string) => {
    try {
      const url = `${API_URL}/otp/login-phone-v2`;
      const headers = { token, device: 'WEB' };
      const body = { phone, isLogin: true };
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'signInPhone',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  signInPhoneVerification: async (phone: string, otp: string) => {
    try {
      const url = `${API_URL}/otp/verify-login-phone`;
      const response = await axios.post(url, { phone, otp });
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'signInPhoneVerification',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  signInEmail: async (email: string, token: string) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/otp/login-email-v2`;
      const headers = { token, device: 'WEB' };
      const body = { email, isLogin: true };
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'signInEmail',
          },
        });
      }
      return parseAxiosError(error);
    }
  },

  ottValidate: async (token: string) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/auth/validateott/${token}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'signInOttValidate',
          },
        });
      }
      return parseAxiosError(error);
    }
  },

  signInEmailVerification: async (
    email: string,
    otp: string,
    guestToken?: string,
  ) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/otp/verify-login-email`;
      const response = await axios.post(url, { email, otp, guestToken });
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'signInEmailVerification',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  signUpPhone: async (
    phone: string,
    token: string | null,
    recaptchaDisabled = false,
  ) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = getLoginPhone(token, recaptchaDisabled);
      const headers = token
        ? { headers: { token, device: 'WEB' } }
        : { device: 'WEB' };
      const response = await axios.post(
        url,
        { phone, isLogin: false },
        headers,
      );
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'signUpPhone',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  signUpPhoneVerification: async (
    phone: string,
    otp: string,
    signal?: AbortSignal,
    referralCode?: string,
    isVerify: boolean = false,
  ) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/otp/verify-login-phone`;
      const response = await axios.post(
        url,
        {
          phone,
          referralCode,
          otp,
          isVerify,
        },
        { signal },
      );
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'signUpPhoneVerification',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  signUpEmail: async (
    email: string,
    token: string | null,
    recaptchaDisabled = false,
  ) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = getLoginEmail(token, recaptchaDisabled);
      const headers = token ? { headers: { token, device: 'WEB' } } : undefined;
      const response = await axios.post(
        url,
        { email, isLogin: false },
        headers,
      );
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'signUpEmail',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  signUpEmailVerification: async (
    email: string,
    otp: string,
    signal?: AbortSignal,
    referralCode?: string,
    isVerify: boolean = false,
  ) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/otp/verify-login-email`;
      const response = await axios.post(
        url,
        {
          email,
          referralCode,
          otp,
          isVerify,
        },
        { signal },
      );
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'signUpEmailVerification',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  serviceValidateReferralCode: async (referralCode: string) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${REFERRAL_API_URL}/codeCheck/${referralCode}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error: unknown) {
      const parsedError = parseAxiosError(error);
      if (parsedError.errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'serviceValidateReferralCode',
          },
        });
      }
      if (parsedError.errorStatus === 102) return parsedError;
      let errorMessage = 'noumena.error.unknown';
      if (axios.isAxiosError(error) && error.response) {
        const {
          response: { data, status },
        } = error;
        if (status === 422) {
          // errorMessage = ERROR_MESSAGES.INVALID_REFERRAL_CODE
          errorMessage = `noumena.referral_code.error.422`;
        } else if (status === 403) {
          // errorMessage = ERROR_MESSAGES.USED_REFERRAL_CODE
          errorMessage = `noumena.referral_code.error.403`;
        }
        return {
          ...data,
          errorMessage,
        };
      }
      return { ...parsedError, errorMessage };
    }
  },
  serviceSignup: async (input: SignUpValues) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/auth/signup-v4`;
      const response = await axios.post(url, pickBy(input, identity));
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'serviceSignup',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  serviceNonNoumenaSignup: async (input: QuickSignUpValues) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/auth/signup/non_noumena_user`;
      const response = await axios.post(url, pickBy(input, identity));
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'serviceNonNoumenaSignup',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  refreshToken: async (refreshToken: string, retryCounter: number = 0) => {
    try {
      if (retryCounter >= 2) {
        return null;
      }
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/auth/refresh`;
      const response = await axios.post(url, { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      setLocalStorage(accessLocalStorage.ACCESS_TOKEN, accessToken);
      setLocalStorage(accessLocalStorage.REFRESH_TOKEN, newRefreshToken);
      return response.data;
    } catch (error: unknown) {
      setTimeout(() => {
        IdentityServices.refreshToken(refreshToken, retryCounter + 1);
      }, 5000);
      Sentry.captureException(error, {
        tags: {
          section: 'refreshToken',
        },
      });
      return parseAxiosError(error);
    }
  },
  validateContact: async (contactType: 'phone' | 'email', contact: string) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/auth/validate/${contactType}/${contact}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'validateContact',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  verifyWithOneTimeAuth: async (
    token: string,
  ): Response<VerifyWithOneTimeTokenResponse> => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/auth/verifyWithOneTimeAuth`;
      const response = await axios.post<VerifyWithOneTimeTokenResponse>(url, {
        token,
      });

      return generateSuccessResponse(response.data);
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'verifyWithOneTimeAuth',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  signInPassword: async (email: string, password: string, token: string) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/auth/signin?credentialType=PASSWORD`;
      const headers = { token, device: 'WEB' };
      const body = { email, password };
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'signInPassword',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  generateOtpForResetPassword: async (email: string, token: string) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/otp/reset-password/generate`;
      const headers = { token, device: 'WEB' };
      const body = { email };
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'otpForResetPassword',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  verifyPasswordOtp: async ({ email, otp, token }: VerifyPasswordOtp) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/otp/reset-password/verify`;
      const headers = { token, device: 'WEB' };
      const body = { email, otp };
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'otpForResetPassword',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  resetPassword: async ({ email, password, otp, token }: ResetPassword) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/otp/reset-password/update`;
      const headers = { token, device: 'WEB' };
      const body = { email, password, otp };
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'updatePassword',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
  signUpNonNoumenaMember: async ({
    email,
    password,
    firstName,
    lastName,
    guestToken,
    token,
  }: NonNoumenaSignupPayload) => {
    try {
      await CloudFlareService.checkBlockedIP();
      const url = `${API_URL}/auth/update/non_noumena_user`;
      const headers = { token, device: 'WEB' };
      const body = { firstName, lastName, email, password, guestToken };
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (error: unknown) {
      if (parseAxiosError(error).errorStatus !== 400) {
        Sentry.captureException(error, {
          tags: {
            section: 'otpForResetPassword',
          },
        });
      }
      return parseAxiosError(error);
    }
  },
};

export default IdentityServices;
