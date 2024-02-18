import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type BaseNoumMemberNotificationProps } from './types';

const ManagerInviteDeclinedOwner = ({
  users,
  noumName,
  ...basicProps
}: BaseNoumMemberNotificationProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="ManagerInviteDeclinedOwner"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.owner.manager_invite_declined.body"
        values={{
          noumName,
          userName: UserUtil.renderFullName(users[0]),
        }}
      />
    }
  />
);

export default ManagerInviteDeclinedOwner;
