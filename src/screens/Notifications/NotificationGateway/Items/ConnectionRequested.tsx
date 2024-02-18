import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type ConnectionRequestedProps } from './types';

const ConnectionRequested = ({
  noumName,
  requestFrom,
  isReminder,
  ...basicProps
}: ConnectionRequestedProps) => (
  <NotificationItem
    {...basicProps}
    data-testid={
      isReminder ? 'ConnectionRequestedReminder' : 'ConnectionRequested'
    }
    body={
      <TranslatedBody
        i18nKey={
          isReminder
            ? 'noumena.notification_type.connection_requested_reminder.body'
            : 'noumena.notification_type.connection_requested.body'
        }
        values={{
          noumName,
          requestFrom: UserUtil.renderFullName(requestFrom),
        }}
      />
    }
  />
);

export default ConnectionRequested;
