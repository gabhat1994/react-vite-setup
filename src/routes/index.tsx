import ErrorBoundary from '@/components/ErrorBoundary';
import { Spinner } from '@/components/Spinner';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly } from '@/hooks';
import NotFound from '@/pages/NotFound';
import Redirect from '@/pages/Redirect';
import { Suspense, type LazyExoticComponent } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProductFruits } from '@/services/ProductFruits';
import { SignedInRoute } from './SignedInRoute';
import { SignedOutRoute } from './SignedOutRoute';
import { UnauthenticatedUserRoute } from './UnauthenticatedUserRoute';
import { UnregisteredUserRoute } from './UnregisteredUserRoute';
import routes from './routes';
import {
  type PermissionResourceType,
  type RouteAccessPolicyType,
} from './types';
import { RouterUtils } from './utils';

const EXCLUDED_ROUTES = [ROUTES.LOGIN, ROUTES.SIGN_UP, ROUTES.ACCOUNT_SETTINGS];

type WrappedElementProps = {
  Element: LazyExoticComponent<() => JSX.Element>;
  requireAuth: boolean;
  routeAccessPolicy?: RouteAccessPolicyType;
  isUnregistered?: boolean;
  isUnauthenticated?: boolean;
  resourceType?: PermissionResourceType;
};

const wrappedElement = ({
  Element,
  requireAuth,
  isUnregistered,
  routeAccessPolicy,
  resourceType,
  isUnauthenticated,
}: WrappedElementProps) => {
  const initialRoute = EXCLUDED_ROUTES.find(
    (e) => e === window.location.pathname,
  )
    ? ''
    : window.location.pathname + window.location.search;

  if (isUnregistered) {
    return (
      <UnregisteredUserRoute
        routeAccessPolicy={routeAccessPolicy}
        resourceType={resourceType}
      >
        <Suspense fallback={<Spinner />}>
          <Element />
        </Suspense>
      </UnregisteredUserRoute>
    );
  }

  if (isUnauthenticated) {
    return (
      <UnauthenticatedUserRoute
        routeAccessPolicy={routeAccessPolicy}
        resourceType={resourceType}
      >
        <Suspense fallback={<Spinner />}>
          <Element />
        </Suspense>
      </UnauthenticatedUserRoute>
    );
  }

  if (
    !RouterUtils.hasUserRouteAccess({
      routeAccessPolicy,
      isUnauthenticated: false,
      isUnregistered: false,
    })
  ) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  return requireAuth ? (
    <SignedInRoute
      routeAccessPolicy={routeAccessPolicy}
      resourceType={resourceType}
    >
      <Suspense fallback={<Spinner />}>
        <Element />
      </Suspense>
    </SignedInRoute>
  ) : (
    <SignedOutRoute
      initialRoute={initialRoute}
      routeAccessPolicy={routeAccessPolicy}
      resourceType={resourceType}
    >
      <Suspense fallback={<Spinner />}>
        <Element />
      </Suspense>
    </SignedOutRoute>
  );
};

export default () => {
  const { user, loading, isUnregistered, isUnauthenticated } = useAuth();
  const { initialized } = useLaunchDarkly();

  return (!user && loading) || !initialized ? (
    <Spinner />
  ) : (
    <ErrorBoundary>
      <Routes>
        {routes.map(
          ({
            path,
            Element,
            key,
            routeAccessPolicy,
            resourceType,
            nestable,
            requireAuth,
          }) => (
            <Route
              path={nestable ? `${path}/*` : path}
              element={wrappedElement({
                Element,
                requireAuth,
                routeAccessPolicy,
                isUnregistered,
                isUnauthenticated,
                resourceType,
              })}
              key={key}
            />
          ),
        )}
        <Route
          path={ROUTES.CHAMBERS}
          element={<Navigate to={ROUTES.NOUMS} />}
        />
        <Route path={ROUTES.CHAMBER} element={<Redirect />} />
        <Route path={ROUTES.EDIT_CHAMBER} element={<Redirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ProductFruits />
    </ErrorBoundary>
  );
};
