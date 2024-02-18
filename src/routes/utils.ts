import { type AccessTokenPayload } from '@/apollo/client.helpers';
import {
  type PermissionResourceType,
  type RouteAccessPolicyType,
} from './types';

const hasUserRouteAccess = ({
  isUnregistered,
  isUnauthenticated,
  routeAccessPolicy,
}: {
  isUnregistered?: boolean;
  isUnauthenticated?: boolean;
  routeAccessPolicy?: RouteAccessPolicyType;
}) => {
  if (routeAccessPolicy === 'all') {
    return true;
  }
  switch (true) {
    case isUnregistered:
      return routeAccessPolicy === 'unregistered-only';
    case isUnauthenticated:
      return routeAccessPolicy === 'unauthenticated-only';
    default:
      // no routeAccessPolicy means it's accessible only to active users
      return !routeAccessPolicy;
  }
};

const hasResourceAccess = ({
  tokenData,
  resourceType,
}: {
  tokenData: AccessTokenPayload;
  resourceType?: PermissionResourceType;
}) =>
  !tokenData.resourceType ||
  (tokenData.resourceType && resourceType === tokenData.resourceType);

export const RouterUtils = {
  hasResourceAccess,
  hasUserRouteAccess,
};
