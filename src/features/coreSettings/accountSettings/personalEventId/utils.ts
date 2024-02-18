import { generatePath } from 'react-router';

import routes from '@/constants/routes';
import { type UserFragment } from '@/apollo/graphql/fragments';
import { type Maybe } from 'graphql/jsutils/Maybe';

export const generatePersonalInviteLink = (user: Maybe<UserFragment>) =>
  user
    ? generatePath(routes.PERSONAL_SOCIAL_HALL, {
        id: user?.userSocialHall?.name ?? '',
      })
    : '';
