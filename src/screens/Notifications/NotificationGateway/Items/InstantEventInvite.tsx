import { t } from 'i18next';
import NotificationItem, {
  NotificationButton,
  TranslatedBody,
} from '../../NotificationLayout';
import { type EventInstantProps } from './types';

const InstantEventInvite = ({
  event,
  onJoin,
  ...basicProps
}: EventInstantProps) => (
  <NotificationItem
    {...basicProps}
    isViewed={basicProps.isViewed}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.event_invite_unread_body"
        values={{
          requestFrom: `${event?.id?.userId?.firstName} ${event?.id?.userId?.lastName}`,
          eventName: event?.id?.title,
        }}
      />
    }
    avatars={basicProps.avatars}
    timestamp={basicProps.timestamp}
    buttons={
      <NotificationButton onClick={onJoin} variant="primary">
        {t('noumena.social_hall.invite.join_now')}
      </NotificationButton>
    }
  />
);

export default InstantEventInvite;
