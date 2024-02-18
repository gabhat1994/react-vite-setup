import { useEffect, type FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { UserStatus } from '@/apollo/generated/types';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { hasAnsweredMoreInfo } from '@/features/user/onboarding/utils';
import { UserUtil } from '@/utils/user';
import {
  type PermissionResourceType,
  type RouteAccessPolicyType,
} from './types';
import { useHandleRestrictedRoutes } from './useHandleRestrictedRoutes';
import { useRouterAuthRedirect } from './useRouterAuthRedirect';

type SignedInRouteProps = {
  routeAccessPolicy?: RouteAccessPolicyType;
  resourceType?: PermissionResourceType;
};

export const SignedInRoute: FC<SignedInRouteProps> = ({
  children,
  routeAccessPolicy,
  resourceType,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const {
    user,
    loading,
    isUnregistered,
    isActive,
    isPending,
    currentUserLoading,
    isLoadingAnswers,
    onboardingAnswers,
  } = useAuth();

  const isRejected = UserUtil.isRejected(user);

  useRouterAuthRedirect();
  useHandleRestrictedRoutes(routeAccessPolicy, resourceType);

  useEffect(() => {
    if (
      onboardingAnswers === undefined ||
      !user ||
      isLoadingAnswers ||
      currentUserLoading ||
      isUnregistered ||
      isRejected
    ) {
      return;
    }

    if ((isActive || isPending) && !onboardingAnswers) {
      navigate(ROUTES.SIGN_UP_QUESTIONS);
    }

    if (isPending && onboardingAnswers && !hasAnsweredMoreInfo(user)) {
      navigate(ROUTES.MORE_INFO);
    }
  }, [
    currentUserLoading,
    user,
    onboardingAnswers,
    isPending,
    isActive,
    navigate,
    isUnregistered,
    isRejected,
    isLoadingAnswers,
  ]);

  useEffect(() => {
    if (loading || isLoadingAnswers) return;

    if (!user) {
      return;
    }

    if (location.pathname === ROUTES.SESSION_EXPIRED) return;

    if (isRejected && location.pathname !== ROUTES.INACTIVE) {
      navigate(ROUTES.INACTIVE, { replace: true });
    } else if (
      user.userStatus === UserStatus.Active &&
      location.pathname === ROUTES.INACTIVE
    ) {
      navigate(ROUTES.ACTIVE);
    } else if (!isRejected && location.pathname === ROUTES.INACTIVE) {
      navigate(-1);
    }

    if (isPending) {
      if (location.pathname === ROUTES.INVITES_FRIENDS) {
        navigate(ROUTES.ACCOUNT_SETTINGS, { replace: true });
      } else if (onboardingAnswers?.userSelection?.length === 7) {
        if (!hasAnsweredMoreInfo(user)) {
          if (
            !(
              location.pathname === ROUTES.SIGNUP_PENDING ||
              location.pathname === ROUTES.SIGN_UP_QUESTIONS ||
              location.pathname === ROUTES.MORE_INFO
            )
          ) {
            navigate(ROUTES.MORE_INFO, { replace: true });
          }
        }
      }
    }
  }, [
    user,
    navigate,
    location,
    loading,
    isLoadingAnswers,
    isUnregistered,
    params.id,
    isActive,
    isPending,
    onboardingAnswers,
    isRejected,
  ]);

  return <>{!loading && children}</>;
};
