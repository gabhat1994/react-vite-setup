import { useAuth } from '@/features/auth/contexts';
import { generatePath, matchPath, useNavigate } from 'react-router';
import ROUTES from '@/constants/routes';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { type AccessTokenPayload } from '@/apollo/client.helpers';
import { getLocalStorage } from '@/utils/localStorage';
import { useInitialSignUp } from '@/features/onboarding/hooks';
import { RouterUtils } from './utils';
import {
  type PermissionResourceType,
  type RouteAccessPolicyType,
} from './types';

const authorizedRoutes: Record<string, string> = {
  [ROUTES.AUTH_USER]: ROUTES.AUTH_USER,
};

export const useHandleRestrictedRoutes = (
  routeAccessPolicy?: RouteAccessPolicyType,
  resourceType?: PermissionResourceType,
) => {
  const pathName = window.location.pathname;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectUrl = searchParams.get('redirectUrl');

  const {
    user,
    loading,
    initialUnsubscribeFrom,
    isUnauthenticated,
    isUnregistered,
    signOut,
    initialInvoiceId,
    initialContractId,
    initialSowId,
  } = useAuth();

  const {
    isSigningUpFromNextApp,
    isLoggingingUpFromNextApp,
    quickSignUpNoumId,
  } = useInitialSignUp();

  const isSinglePostPage =
    matchPath({ path: ROUTES.POSTS }, pathName) ||
    matchPath({ path: ROUTES.POST }, pathName);

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    const tokenData = jwtDecode<AccessTokenPayload>(
      getLocalStorage(accessLocalStorage.ACCESS_TOKEN),
    );

    if (
      !RouterUtils.hasUserRouteAccess({
        isUnregistered,
        isUnauthenticated,
        routeAccessPolicy,
      })
    ) {
      if (isUnregistered) {
        if (isSinglePostPage) return;
        if (!isSigningUpFromNextApp && !isLoggingingUpFromNextApp) {
          navigate(ROUTES.GUEST_HOME, { replace: true });
          return;
        }
        if (isSigningUpFromNextApp) {
          navigate(ROUTES.QUICK_SIGN_UP_COMPLETED, { replace: true });
          return;
        }
        if (isLoggingingUpFromNextApp) {
          if (quickSignUpNoumId) {
            navigate(generatePath(ROUTES.NOUM, { id: quickSignUpNoumId }), {
              replace: true,
            });
          }
          return;
        }
        navigate(ROUTES.GUEST_HOME, { replace: true });
        return;
      }
      if (isUnauthenticated) {
        signOut();
        return;
      }
    }

    if (
      !RouterUtils.hasResourceAccess({
        tokenData,
        resourceType,
      }) &&
      !authorizedRoutes[pathName]
    ) {
      signOut();

      return;
    }

    if (pathName === ROUTES.AUTH_USER) {
      if (initialInvoiceId) {
        navigate(
          generatePath(ROUTES.INVOICE_DETAILS, { id: initialInvoiceId }),
          { replace: true },
        );
      } else if (initialContractId) {
        navigate(
          generatePath(ROUTES.CONTRACT_PREVIEW, { id: initialContractId }),
          {
            replace: true,
          },
        );
      } else if (initialSowId) {
        navigate(
          generatePath(ROUTES.STATEMENT_OF_WORK_PREVIEW, { id: initialSowId }),
          {
            replace: true,
          },
        );
      } else if (initialUnsubscribeFrom) {
        navigate(
          {
            pathname: ROUTES.EMAIL_UNSUBSCRIBE,
            search: `?unsubscribeFrom=${initialUnsubscribeFrom}`,
          },
          {
            replace: true,
          },
        );
      } else if (redirectUrl) {
        navigate(
          redirectUrl || (isUnregistered ? ROUTES.GUEST_HOME : ROUTES.HOME),
          { replace: true },
        );
      }
    }
  }, [
    loading,
    navigate,
    pathName,
    user,
    routeAccessPolicy,
    initialUnsubscribeFrom,
    isUnauthenticated,
    signOut,
    initialInvoiceId,
    initialContractId,
    initialSowId,
    isUnregistered,
    redirectUrl,
    resourceType,
    isSigningUpFromNextApp,
    isLoggingingUpFromNextApp,
    quickSignUpNoumId,
    isSinglePostPage,
  ]);
};
