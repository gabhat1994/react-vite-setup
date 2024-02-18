import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type BaseNoumMemberNotificationProps } from './types';

const ManagerResignedOwner = ({
  users,
  noumName,
  noumOwner,
  noumMember,
  status,
  ...basicProps
}: BaseNoumMemberNotificationProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="ManagerResignedOwner"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.owner.manager_resigned.body"
        values={{
          noumName,
          userName: UserUtil.renderFullName(users[0]),
        }}
      />
    }
  />
);

export default ManagerResignedOwner;
