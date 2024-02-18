import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type ConnectionInviteAcceptedProps } from './types';

const ConnectionInviteAccepted = ({
  noumName,
  requestTo,
  ...basicProps
}: ConnectionInviteAcceptedProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.connection_invite_accepted.body"
        values={{
          noumName,
          requestTo: UserUtil.renderFullName(requestTo),
        }}
      />
    }
  />
);
export default ConnectionInviteAccepted;
