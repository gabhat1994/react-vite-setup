import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type BaseNoumMemberNotificationProps } from './types';

const ManagerAccessTerminated = ({
  noumName,
  ...basicProps
}: BaseNoumMemberNotificationProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="ManagerAccessTerminated"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.manager.manager_access_terminated.body"
        values={{
          noumName,
        }}
      />
    }
  />
);

export default ManagerAccessTerminated;
