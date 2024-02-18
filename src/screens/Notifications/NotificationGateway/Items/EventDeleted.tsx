import { InvitationStatus, UserRole } from '@/apollo/generated/types';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type EventDeletedProps } from './types';

const EventDeleted = ({
  event,
  userRole,
  invitationStatus,
  ...basicProps
}: EventDeletedProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="EventDeleted"
    body={
      <TranslatedBody
        i18nKey={
          invitationStatus === InvitationStatus.Pending
            ? 'noumena.notification_type.event_deleted.pending_invitation.body'
            : userRole === UserRole.Cohost
            ? 'noumena.notification_type.event_deleted.cohost.body'
            : 'noumena.notification_type.event_deleted.attendee.body'
        }
        values={{
          eventName: event?.id?.title,
        }}
      />
    }
  />
);

export default EventDeleted;
