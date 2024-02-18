import { useCallback } from 'react';
import {
  type NavigateOptions,
  type Path,
  type To,
  useLocation,
  useNavigate,
} from 'react-router';

interface LocationStateWithOrigin extends Path {
  state?: {
    origin?: string;
  };
  key: string;
}

/**
 * Navigate through multiple screens and persist the "origin" (where you are coming from),
 * then go back to the origin with a single function call.
 */
export function useNavigateWithOrigin() {
  const navigate = useNavigate();
  const location = useLocation() as LocationStateWithOrigin;

  /**
   * Use fallbackUrl in case there is no origin in state (e.g. direct URL access)
   */
  const goBackToOrigin = useCallback(
    ({ fallbackUrl }: { fallbackUrl?: string } = {}) => {
      if (location.state?.origin) {
        navigate(location.state.origin);
      } else if (fallbackUrl) {
        navigate(fallbackUrl);
      } else {
        navigate(-1);
      }
    },
    [location.state?.origin, navigate],
  );

  const navigateAndPassOrigin = useCallback(
    (to: To, options?: Omit<NavigateOptions, 'state'>) => {
      navigate(to, {
        ...options,
        state: { origin: location.state?.origin },
      });
    },
    [location.state, navigate],
  );

  const navigateAndSetOrigin = useCallback(
    (to: To, options?: Omit<NavigateOptions, 'state'>) => {
      navigate(to, {
        ...options,
        state: { origin: location.pathname + location.search },
      });
    },
    [location.pathname, location.search, navigate],
  );

  return { goBackToOrigin, navigateAndPassOrigin, navigateAndSetOrigin };
}

interface NavigateBackOptions {
  fallback?: string;
  replace?: boolean;
}

export function useNavigateBack() {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * If there are any pages in browser history that belong to our website, navigate back.
   * Else, go to the fallback path.
   */
  const navigateBack = useCallback(
    (delta: number, { fallback, replace }: NavigateBackOptions) => {
      if (location.key === 'default' && fallback) {
        navigate(fallback, { replace });
      } else {
        navigate(delta);
      }
    },
    [location.key, navigate],
  );

  return navigateBack;
}
