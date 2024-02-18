import { matchPath, useLocation } from 'react-router';

import ROUTES from '@/constants/routes';

export const useIsSocialHallUrl = () => {
  const { pathname } = useLocation();
  return (
    matchPath({ path: ROUTES.SOCIAL_HALL }, pathname) ||
    matchPath({ path: ROUTES.PERSONAL_SOCIAL_HALL }, pathname)
  );
};
