import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type NoumUnfollowProps } from './types';

const NoumUnfollow = ({
  users,
  noumName,
  ...basicProps
}: NoumUnfollowProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.noum_unfollow.body"
        values={{
          userName: formatMultipleUserNames(users),
          noumName,
        }}
      />
    }
  />
);

export default NoumUnfollow;
