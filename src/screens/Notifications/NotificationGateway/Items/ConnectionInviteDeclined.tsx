import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type ConnectionInviteDeclinedProps } from './types';

const ConnectionInviteDeclined = ({
  noumName,
  requestTo,
  ...basicProps
}: ConnectionInviteDeclinedProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.connection_invite_declined.body"
        values={{
          noumName,
          requestTo: UserUtil.renderFullName(requestTo),
        }}
      />
    }
  />
);

export default ConnectionInviteDeclined;
