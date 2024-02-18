import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type BaseNoumMemberNotificationProps } from './types';

function MemberRoleUpdated({
  noumName,
  status,
  users,
  noumMember,
  ...basicProps
}: BaseNoumMemberNotificationProps) {
  return (
    <NotificationItem
      {...basicProps}
      data-testid="MemberRoleUpdated"
      body={
        <TranslatedBody
          i18nKey="noumena.notification_type.manager.member_role_updated.body"
          values={{
            noumName,
            user: UserUtil.renderFullName(users[0]),
            prevRole: noumMember?.previousRole?.name,
            nextRole: noumMember?.role?.name,
          }}
        />
      }
    />
  );
}

export default MemberRoleUpdated;
