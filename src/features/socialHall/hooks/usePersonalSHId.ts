import ROUTES from '@/constants/routes';
import { matchPath, useLocation } from 'react-router';

export const usePersonalSHId = () => {
  const { pathname } = useLocation();
  const personalSocialHall = matchPath(
    { path: ROUTES.PERSONAL_SOCIAL_HALL },
    pathname,
  );

  return personalSocialHall?.params.id;
};
