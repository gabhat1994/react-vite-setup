import { UserRole } from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import NotificationItem, {
  NotificationButton,
  TranslatedBody,
} from '../../NotificationLayout';
import { isStaleEvent } from '../utils';
import { type EventStartingProps } from './types';

const EventStarting = ({
  event,
  userRole,
  onJoin,
  onGoLive,
  ...basicProps
}: EventStartingProps) => {
  const { t } = useTranslation();

  return userRole === UserRole.Host ? (
    <NotificationItem
      {...basicProps}
      data-testid="EventStartingHost"
      body={
        <TranslatedBody
          i18nKey="noumena.calendar.notification.description.host_event_starting"
          values={{
            eventName: event?.id?.title,
          }}
        />
      }
      buttons={
        !isStaleEvent(event) && (
          <NotificationButton
            variant="primary"
            onClick={() => {
              onGoLive();
              onJoin();
            }}
            leftIcon={
              <Icon
                name="wave_left_m"
                size={24}
                color="--icon-button-neutral-alt-default"
              />
            }
            rightIcon={
              <Icon
                name="wave_right_m"
                size={24}
                color="--icon-button-neutral-alt-default"
              />
            }
          >
            {t('noumena.notifications.events.go_live_now')}
          </NotificationButton>
        )
      }
    />
  ) : (
    <NotificationItem
      {...basicProps}
      data-testid="EventStartingParticipant"
      body={
        <TranslatedBody
          i18nKey="noumena.calendar.notification.description.participant_event_starting"
          values={{
            eventName: event?.id?.title,
          }}
        />
      }
      buttons={
        !isStaleEvent(event) && (
          <NotificationButton variant="primary" onClick={onJoin}>
            {t('noumena.notifications.events.join_now')}
          </NotificationButton>
        )
      }
    />
  );
};

export default EventStarting;
