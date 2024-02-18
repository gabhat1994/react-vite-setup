import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type ConnectionDisconnectedProps } from './types';

const ConnectionDisconnected = ({
  noumName,
  users,
  ...basicProps
}: ConnectionDisconnectedProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.connection_disconnected.body"
        values={{
          noumName,
          user: UserUtil.renderFullName(users[0]),
        }}
      />
    }
  />
);

export default ConnectionDisconnected;
