import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type BaseNoumMemberNotificationProps } from './types';

const ManagerInviteExpiredOwner = ({
  users,
  noumName,
  ...basicProps
}: BaseNoumMemberNotificationProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="ManagerInviteExpiredOwner"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.owner.mmanager_invite_expired.body"
        values={{
          noumName,
          userName: UserUtil.renderFullName(users[0]),
        }}
      />
    }
  />
);

export default ManagerInviteExpiredOwner;
