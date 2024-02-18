import { type FC, useEffect } from 'react';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { useInitialSignUp } from '@/features/onboarding/hooks';
import { useRouterAuthRedirect } from './useRouterAuthRedirect';
import {
  type PermissionResourceType,
  type RouteAccessPolicyType,
} from './types';
import { useHandleRestrictedRoutes } from './useHandleRestrictedRoutes';

type TLocationState = {
  fromPath: string;
};

type UnregisteredUserRouteProps = {
  routeAccessPolicy?: RouteAccessPolicyType;
  resourceType?: PermissionResourceType;
};

export const UnregisteredUserRoute: FC<UnregisteredUserRouteProps> = ({
  children,
  routeAccessPolicy,
  resourceType,
}) => {
  const {
    isSigningUpFromNextApp,
    isLoggingingUpFromNextApp,
    quickSignUpNoumId,
  } = useInitialSignUp();
  const pathName = window.location.pathname;
  const { user, loading, initialNoumId } = useAuth();
  const navigate = useNavigate();
  const { state: locationState } = useLocation() as { state: TLocationState };

  useRouterAuthRedirect();
  useHandleRestrictedRoutes(routeAccessPolicy, resourceType);

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    if (pathName === ROUTES.SESSION_EXPIRED && !locationState?.fromPath) {
      navigate(-1);
    }

    if (pathName === ROUTES.ACCESS) {
      if (initialNoumId)
        navigate(generatePath(ROUTES.NOUM, { id: `${initialNoumId}` }), {
          replace: true,
        });
    } else {
      const redirectUri = getLocalStorage(
        accessLocalStorage.GUEST_REDIRECT_TO_URI,
      );
      if (
        redirectUri &&
        !isSigningUpFromNextApp &&
        !isLoggingingUpFromNextApp
      ) {
        navigate(`../${redirectUri}`, {
          replace: true,
        });
        setLocalStorage(accessLocalStorage.GUEST_REDIRECT_TO_URI);
      }
    }
  }, [
    initialNoumId,
    loading,
    locationState?.fromPath,
    navigate,
    pathName,
    user,
    routeAccessPolicy,
    isSigningUpFromNextApp,
    isLoggingingUpFromNextApp,
    quickSignUpNoumId,
  ]);

  return <>{!loading && children}</>;
};
