import { UserRole } from '@/apollo/generated/types';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type EventReminderProps } from './types';

const EventReminder = ({
  event,
  userRole,
  ...basicProps
}: EventReminderProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="EventReminder"
    body={
      <TranslatedBody
        i18nKey={
          userRole === UserRole.Host
            ? 'noumena.notification_type.event_reminder.host.body'
            : 'noumena.notification_type.event_reminder.guest.body'
        }
        values={{
          eventName: event?.id?.title,
        }}
      />
    }
  />
);

export default EventReminder;
