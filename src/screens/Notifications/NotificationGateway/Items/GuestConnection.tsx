import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type GuestConnectionProps } from './types';

const GuestConnection = ({
  noumName,
  noumOwner,
  ...basicProps
}: GuestConnectionProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.guest_connection.body"
        values={{
          noumOwner: UserUtil.renderFullName(noumOwner),
          noumName,
        }}
      />
    }
  />
);

export default GuestConnection;
