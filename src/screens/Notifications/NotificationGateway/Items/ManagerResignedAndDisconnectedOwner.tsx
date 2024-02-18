import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type BaseNoumMemberNotificationProps } from './types';

const ManagerResignedAndDisconnectedOwner = ({
  users,
  noumName,
  ...basicProps
}: BaseNoumMemberNotificationProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="ManagerResignedAndDisconnectedOwner"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.owner.manager_resigned_and_disconnected.body"
        values={{
          noumName,
          userName: UserUtil.renderFullName(users[0]),
        }}
      />
    }
  />
);

export default ManagerResignedAndDisconnectedOwner;
