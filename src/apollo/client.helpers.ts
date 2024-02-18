import { setContext } from '@apollo/client/link/context';
import * as Sentry from '@sentry/react';
import { type ErrorResponse } from '@apollo/client/link/error';
import { type ServerError } from '@apollo/client/link/utils';
import { type ServerParseError } from '@apollo/client/link/http';
import jwtDecode from 'jwt-decode';
import { type Operation } from '@apollo/client';
import ROUTES from '@/constants/routes';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { IdentityServices } from '@/services/rest/identity';
import { type PermissionResourceType } from '@/routes/types';
import { TokenRefreshLink } from './utils/RefreshTokenLink/RefreshTokenLink';
import operationsToBeRistrictedForRetrying from './restrictOperationHelper';

export interface AccessTokenPayload {
  expiredAt: number;
  createdAt: number;
  roles: string[];
  _id: string;
  iat: number;
  exp: number;
  resourceId?: string;
  resourceType?: PermissionResourceType;
}
interface AccessTokenResponse {
  accessToken?: string;
  refreshToken?: string;
}

export function isServerError(
  obj: Error | ServerError | ServerParseError | undefined | null,
): obj is ServerError {
  return obj?.message !== undefined;
}

export function isServerParseError(
  obj: Error | ServerError | ServerParseError | undefined | null,
): obj is ServerParseError {
  return obj?.message !== undefined;
}

export const generateAuthorizationLink = (accessToken: string) =>
  setContext((_, { headers, ...context }) => ({
    headers: {
      ...headers,
      ...(accessToken ? { authorization: `JWT ${accessToken}` } : {}),
    },
    ...context,
  }));

export const onErrorCallback = (capturedError: ErrorResponse) => {
  const { graphQLErrors, operation, forward, networkError } = capturedError;
  if (graphQLErrors) {
    if (operationsToBeRistrictedForRetrying.includes(operation.operationName)) {
      return undefined;
    }
    return forward(operation);
  }
  if (networkError) {
    if (isServerError(networkError) || isServerParseError(networkError)) {
      // logout the users if the server return an authentication error
      if (networkError.statusCode === 401) {
        Sentry.captureException(
          new Error(
            `file: "client.helper.ts", context: "onErrorCallback -> networkError.statusCode === 401"`,
          ),
          {
            tags: { section: 'Tracking Logout' },
          },
        );
        logout('redirected to logoin screen-onErrorCallback-client-helper');
      }
    }

    return forward(operation);
  }
  return undefined;
};

export const generateRefreshLink = () =>
  new TokenRefreshLink<AccessTokenResponse>({
    isTokenValidOrUndefined: (operation: Operation) => {
      const accessToken = getLocalStorage(accessLocalStorage.ACCESS_TOKEN);
      if (!accessToken) return true;
      const isValid = isValidToken(accessToken);
      if (isValid) {
        const oldHeaders = operation.getContext().headers;
        operation.setContext({
          headers: {
            ...oldHeaders,
            authorization: `JWT ${accessToken}`,
          },
        });
      }

      return isValid;
    },
    fetchAccessToken: async () => {
      const storedRefreshToken = getLocalStorage(
        accessLocalStorage.REFRESH_TOKEN,
      );
      return IdentityServices.refreshToken(storedRefreshToken);
    },
    handleFetch: async (payload: unknown, operation: Operation) => {
      if (payload && typeof payload === 'object') {
        const { accessToken, refreshToken: newRefreshToken } =
          payload as AccessTokenResponse;
        setLocalStorage(accessLocalStorage.ACCESS_TOKEN, accessToken);
        setLocalStorage(accessLocalStorage.REFRESH_TOKEN, newRefreshToken);

        const oldHeaders = operation.getContext().headers;
        operation.setContext({
          headers: {
            ...oldHeaders,
            authorization: `JWT ${accessToken}`,
          },
        });
      } else {
        throw new Error(`Invalid access token response`);
      }
    },
    handleError: () => {
      Sentry.captureException(
        new Error(
          `file: "client.helper.ts", context: "generateRefreshLink -> handleError"`,
        ),
        {
          tags: { section: 'Tracking Logout' },
        },
      );
      logout('redirected to logoin screen-generateRefreshLink-client-helper');
    },
  });

const isValidToken = (token: string): boolean => {
  try {
    const expire = jwtDecode<AccessTokenPayload>(token).exp * 1000;
    const difference = expire - new Date().getTime();
    return difference >= 10000;
  } catch (err) {
    return false;
  }
};

const logout = (msg?: string) => {
  setLocalStorage(accessLocalStorage.ACCESS_TOKEN);
  setLocalStorage(accessLocalStorage.REFRESH_TOKEN);
  Sentry.captureException({ msg } instanceof Error, {
    tags: {
      section: 'navigateTOLogin-client-helper',
    },
  });
  window.location.replace(ROUTES.LOGIN);
};
