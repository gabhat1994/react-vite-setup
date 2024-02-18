import { InvitationStatus, UserRole } from '@/apollo/generated/types';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type EventDateModifiedProps } from './types';

const EventDateModified = ({
  event,
  userRole,
  invitationStatus,
  ...basicProps
}: EventDateModifiedProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="EventDateModified"
    body={
      <TranslatedBody
        i18nKey={
          invitationStatus === InvitationStatus.Pending
            ? 'noumena.notification_type.event_date_modified.pending_invitation.body'
            : userRole === UserRole.Cohost
            ? 'noumena.notification_type.event_date_modified.cohost.body'
            : 'noumena.notification_type.event_date_modified.attendee.body'
        }
        values={{
          eventName: event?.id?.title,
        }}
      />
    }
  />
);

export default EventDateModified;
