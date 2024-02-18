import * as Sentry from '@sentry/react';
import type accessLocalStorage from '@/constants/accessLocalStorage';
import type onboardingStatusLocalStorage from '@/constants/onboardingStatusLocalStorage';

export const getLocalStorage = (
  KEY:
    | keyof typeof accessLocalStorage
    | keyof typeof onboardingStatusLocalStorage
    | 'test',
) => {
  if (typeof window === 'undefined') return null;
  const current = localStorage.getItem(KEY);
  try {
    return current === null ? null : JSON.parse(current);
  } catch (e: unknown) {
    Sentry.captureException(e, {
      tags: {
        section: 'getLocalStorage',
      },
    });
    return current === null ? null : current;
  }
};

export const setLocalStorage = (
  KEY:
    | keyof typeof accessLocalStorage
    | keyof typeof onboardingStatusLocalStorage
    | 'test',
  data?: unknown,
) => {
  if (data === undefined) {
    return localStorage.removeItem(KEY);
  }
  // clean up the user object from sensitive data before storing it :)
  return localStorage.setItem(KEY, JSON.stringify(data));
};
