import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type BaseNoumMemberNotificationProps } from './types';

const ManagerAccessTerminatedAndDisconnected = ({
  noumName,
  ...basicProps
}: BaseNoumMemberNotificationProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="ManagerAccessTerminatedAndDisconnected"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.manager.manager_access_terminated_and_disconnected.body"
        values={{
          noumName,
        }}
      />
    }
  />
);

export default ManagerAccessTerminatedAndDisconnected;
