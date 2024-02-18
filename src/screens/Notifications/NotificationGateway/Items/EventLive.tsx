import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { UserRole } from '@/apollo/generated/types';
import NotificationItem, {
  NotificationButton,
  TranslatedBody,
} from '../../NotificationLayout';
import { type EventLiveProps } from './types';
import { isStaleEvent } from '../utils';

const EventLive = ({
  event,
  userRole,
  onJoin,
  onGoLive,
  ...basicProps
}: EventLiveProps) =>
  userRole === UserRole.Host ? (
    <NotificationItem
      {...basicProps}
      data-testid="EventLive"
      body={
        <TranslatedBody
          i18nKey="noumena.notification_type.event_live.host.body"
          values={{
            eventName: event?.id?.title,
          }}
        />
      }
      buttons={
        !isStaleEvent(event) && (
          <NotificationButton
            variant="primary"
            onClick={onGoLive}
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
      body={
        <TranslatedBody
          i18nKey="noumena.notification_type.event_live.guest.body"
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

export default EventLive;
