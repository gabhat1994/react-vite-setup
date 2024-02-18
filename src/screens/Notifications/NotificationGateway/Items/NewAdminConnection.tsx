import { UserUtil } from '@/utils/user';
import { formatMultipleUserNames } from '../utils';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type NewAdminConnectionProps } from './types';

const NewAdminConnection = ({
  users,
  admin,
  ...basicProps
}: NewAdminConnectionProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="NewAdminConnection"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.new_admin_connection.body"
        values={{
          usersList: formatMultipleUserNames(users),
          adminName: UserUtil.renderFullName(admin),
        }}
      />
    }
  />
);

export default NewAdminConnection;
