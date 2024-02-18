import { type FC } from 'react';

import { useAuth } from '@/features/auth/contexts';
import {
  type PermissionResourceType,
  type RouteAccessPolicyType,
} from './types';
import { useHandleRestrictedRoutes } from './useHandleRestrictedRoutes';
import { useRouterAuthRedirect } from './useRouterAuthRedirect';

type UnauthenticatedUserRouteProps = {
  routeAccessPolicy?: RouteAccessPolicyType;
  resourceType?: PermissionResourceType;
};

export const UnauthenticatedUserRoute: FC<UnauthenticatedUserRouteProps> = ({
  children,
  routeAccessPolicy,
  resourceType,
}) => {
  const { loading } = useAuth();

  useRouterAuthRedirect();
  useHandleRestrictedRoutes(routeAccessPolicy, resourceType);

  return <>{!loading && children}</>;
};
