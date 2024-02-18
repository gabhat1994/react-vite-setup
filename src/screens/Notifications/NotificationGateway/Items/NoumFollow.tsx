import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type NoumFollowProps } from './types';

const NoumFollow = ({ noumName, users, ...basicProps }: NoumFollowProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.noum_follow.body"
        values={{
          userName: formatMultipleUserNames(users),
          noumName,
        }}
      />
    }
  />
);

export default NoumFollow;
