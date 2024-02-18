import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import * as Sentry from '@sentry/react';
import { useAuth } from '@/features/auth/contexts';
import routes from '@/constants/routes';

export function useRouterAuthRedirect() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      const windowPath = window.location.pathname;
      const searchQuery = window.location.search;
      const currentLocation =
        windowPath === routes.ACCOUNT_SETTINGS
          ? ''
          : searchQuery !== ''
          ? `${windowPath}${searchQuery}`
          : windowPath;

      Sentry.captureException(
        { msg: 'redirected to logoin screen-Router-1' } instanceof Error,
        {
          tags: {
            section: 'navigateTOLogin-Router-1',
          },
        },
      );

      navigate(routes.LOGIN, {
        replace: false,
        state: { fromPath: currentLocation },
      });
    }
  }, [loading, navigate, user]);
}
