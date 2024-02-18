import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type UserDisconnectFromProjectNoumProps } from './types';

const UserDisconnectFromProjectNoum = ({
  noumName,
  users,
  ...basicProps
}: UserDisconnectFromProjectNoumProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.user_disconnect_from_project_noum.body"
        values={{
          noumName,
          user: UserUtil.renderFullName(users[0]),
        }}
      />
    }
  />
);

export default UserDisconnectFromProjectNoum;
