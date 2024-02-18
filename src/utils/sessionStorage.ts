import * as Sentry from '@sentry/react';
import type SessionStorageKey from '@/constants/sessionStorage';

export const getSessionStorage = (
  KEY: keyof typeof SessionStorageKey | 'test',
) => {
  if (typeof window === 'undefined') return null;
  const current = sessionStorage.getItem(KEY);
  try {
    return current === null ? null : JSON.parse(current);
  } catch (e: unknown) {
    Sentry.captureException(e, {
      tags: {
        section: 'getSessionStorage',
      },
    });
    return current === null ? null : current;
  }
};

export const setSessionStorage = (
  KEY: keyof typeof SessionStorageKey | 'test',
  data?: unknown,
) => {
  if (data === undefined) {
    return sessionStorage.removeItem(KEY);
  }
  return sessionStorage.setItem(KEY, JSON.stringify(data));
};
