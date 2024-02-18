import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type BaseNoumMemberNotificationProps } from './types';

const ManagerInviteExpired = ({
  noumName,
  ...basicProps
}: BaseNoumMemberNotificationProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="ManagerInviteExpired"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.manager.manager_invite_expired.body"
        values={{
          noumName,
        }}
      />
    }
  />
);

export default ManagerInviteExpired;
