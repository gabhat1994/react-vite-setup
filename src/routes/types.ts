import { type LazyExoticComponent } from 'react';
import type ROUTES from '@/constants/routes';

export type PermissionResourceType =
  | 'contract'
  | 'invoice'
  | 'sow'
  | 'emailSubscription';

export type RouteAccessPolicyType =
  | 'unregistered-only'
  | 'registered-only'
  | 'unauthenticated-only'
  | 'all';

export type PageRoutes = {
  path: typeof ROUTES[keyof typeof ROUTES];
  Element: LazyExoticComponent<() => JSX.Element>;
  routeAccessPolicy?: RouteAccessPolicyType;
  resourceType?: PermissionResourceType;
  key: string;
  requireAuth: boolean;
  // adds asterisk to the end of the path
  nestable?: boolean;
};
