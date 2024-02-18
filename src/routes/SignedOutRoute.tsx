import { type FC, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { UserStatus } from '@/apollo/generated/types';
import { type HTMLProps } from '@/components/Chips/types';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { hasAnsweredMoreInfo } from '@/features/user/onboarding/utils';
import { useHandleRestrictedRoutes } from './useHandleRestrictedRoutes';
import {
  type PermissionResourceType,
  type RouteAccessPolicyType,
} from './types';

type TLocationState = {
  fromPath: string;
};

const authorizedRoutes: { [key: string]: string } = {
  [ROUTES.SIGN_UP]: ROUTES.SIGN_UP,
  [ROUTES.REGISTER]: ROUTES.REGISTER,
  [ROUTES.LOGIN]: ROUTES.LOGIN,
  [ROUTES.ADMIN_LOGIN]: ROUTES.ADMIN_LOGIN,
  [ROUTES.SIGN_UP_OTP]: ROUTES.SIGN_UP_OTP,
  [ROUTES.ACCESS]: ROUTES.ACCESS,
  [ROUTES.REFERENCE]: ROUTES.REFERENCE,
  [ROUTES.SESSION_EXPIRED]: ROUTES.SESSION_EXPIRED,
  [ROUTES.AUTH_USER]: ROUTES.AUTH_USER,
  [ROUTES.EMAIL_UNSUBSCRIBE]: ROUTES.EMAIL_UNSUBSCRIBE,
  [ROUTES.EMAIL_RESUBSCRIBED]: ROUTES.EMAIL_RESUBSCRIBED,
  [ROUTES.QUICK_SIGN_UP]: ROUTES.QUICK_SIGN_UP,
  [ROUTES.PROXY_ROUTE]: ROUTES.PROXY_ROUTE,
  [ROUTES.COOKIE_POLICY]: ROUTES.COOKIE_POLICY,
  [ROUTES.SOCIAL_AUTH_REDIRECT]: ROUTES.SOCIAL_AUTH_REDIRECT,
  [ROUTES.RESET_PASSWORD]: ROUTES.RESET_PASSWORD,
};

export const SignedOutRoute: FC<
  HTMLProps & {
    initialRoute?: string;
    routeAccessPolicy?: RouteAccessPolicyType;
    resourceType?: PermissionResourceType;
  }
> = ({ children, initialRoute = '/', routeAccessPolicy, resourceType }) => {
  const {
    user,
    loading,
    isUnregistered,
    isActive,
    isPending,
    onboardingAnswers,
  } = useAuth();
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const { state: locationState } = useLocation() as { state: TLocationState };
  /*
      To manage deep linking when a user attempts to log in using social authentication, 
      the backend redirects back to our application. During this redirection, the application refreshes, 
      causing the location.fromPath to become null. Therefore, it's necessary to utilize local storage.
  */
  const localStorageFromPath = getLocalStorage(
    accessLocalStorage.GUEST_REDIRECT_TO_URI,
  );

  useHandleRestrictedRoutes(routeAccessPolicy, resourceType);

  const nextRoute = useMemo(() => {
    const fromPath = locationState?.fromPath || localStorageFromPath;
    if (fromPath) {
      if (fromPath === ROUTES.MORE_INFO) {
        if (
          isActive ||
          (user?.userStatus === UserStatus.Pending &&
            (user?.metadata?.length || user?.profile?.socialLinks?.length))
        ) {
          return ROUTES.HOME;
        }
        return fromPath;
      }
      if ((fromPath === ROUTES.SIGN_UP_QUESTIONS && isActive) || !isActive) {
        return ROUTES.HOME;
      }
      return fromPath;
    }
    if (pathName === ROUTES.AUTH_USER) {
      return null;
    }
    if (isActive && pathName === ROUTES.SIGN_UP_OTP) {
      return ROUTES.SIGN_UP_QUESTIONS;
    }

    if (user && !initialRoute) return ROUTES.HOME;

    return initialRoute === ROUTES.LOGIN || ROUTES.SOCIAL_AUTH_REDIRECT
      ? ROUTES.HOME
      : initialRoute;
  }, [
    locationState,
    localStorageFromPath,
    pathName,
    isActive,
    user,
    initialRoute,
  ]);

  useEffect(() => {
    if (loading) return;
    if (
      pathName.includes(ROUTES.ADMIN_LOGIN) ||
      pathName.includes(ROUTES.COOKIE_POLICY)
    ) {
      return;
    }
    if (pathName === ROUTES.SESSION_EXPIRED && !locationState.fromPath) {
      navigate(ROUTES.LOGIN, { replace: true });
    }

    if (!user && !authorizedRoutes[pathName]) {
      Sentry.captureException(
        new Error('redirected to logoin screen-Router-2'),
        {
          tags: {
            section: 'navigateTOLogin-Router-2',
          },
        },
      );
      navigate(ROUTES.LOGIN, { replace: true });
    }

    if (user && isUnregistered) {
      navigate(ROUTES.GUEST_HOME, { replace: true });
    }
    if (user && isPending) {
      if (hasAnsweredMoreInfo(user)) {
        navigate(ROUTES.HOME);
      } else if (onboardingAnswers) {
        navigate(ROUTES.MORE_INFO);
      } else if (onboardingAnswers !== undefined) {
        navigate(ROUTES.SIGN_UP_QUESTIONS);
      }
      return;
    }

    if (nextRoute && user && !isUnregistered && pathName !== ROUTES.SIGN_UP) {
      setLocalStorage(accessLocalStorage.GUEST_REDIRECT_TO_URI);
      navigate(nextRoute, { replace: true });
    }
  }, [
    loading,
    pathName,
    user,
    isUnregistered,
    navigate,
    nextRoute,
    onboardingAnswers,
    isPending,
    locationState,
  ]);

  return <>{!loading && children}</>;
};
