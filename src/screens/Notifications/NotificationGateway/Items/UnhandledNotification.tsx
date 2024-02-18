import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type UnhandledNotificationProps } from './types';

const UnhandledNotification = ({
  isViewed,
  type,
  timestamp,
}: UnhandledNotificationProps) => (
  <AdminMessage
    data-testid={type}
    isViewed={isViewed}
    timestamp={timestamp}
    title={type}
    body={<TranslatedBody i18nKey="noumena.notification_type.unhandled.body" />}
  />
);

export default UnhandledNotification;
