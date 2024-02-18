import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type BaseNoumMemberNotificationProps } from './types';

const ManagerInviteAcceptedOwner = ({
  users,
  noumName,
  ...basicProps
}: BaseNoumMemberNotificationProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="ManagerInviteAcceptedOwner"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.owner.manager_invite_accepted.body"
        values={{
          noumName,
          userName: UserUtil.renderFullName(users[0]),
        }}
      />
    }
  />
);

export default ManagerInviteAcceptedOwner;
