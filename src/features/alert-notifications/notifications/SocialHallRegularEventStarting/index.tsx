import { AlertNotification } from '@/components/AlertNotification';
import { GoLiveButton } from '@/features/events/components/EventButtons';
import { EventUtils } from '@/utils/event';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEventHandlers } from '@/features/events/hooks';
import { type AlertNotificationGatewayProps } from '../../AlertNotificationGateway';

type SocialHallRegularEventStartingProps = AlertNotificationGatewayProps;

export const SocialHallRegularEventStarting: React.FC<
  SocialHallRegularEventStartingProps
> = ({ onDismiss, notification, ...rest }) => {
  const { eventTitle } = notification;
  const { t } = useTranslation();
  const { onGoLive, onJoinEvent } = useEventHandlers({});

  return EventUtils.isHost(notification.userRole) ? (
    <AlertNotification.Card
      title={eventTitle}
      body={t('noumena.alert_notifications.sh_regular_event_live_host.body')}
      icon="calendar_xs"
      confirmButton={
        <GoLiveButton
          onClick={async () => {
            await onGoLive(notification.eventId);
            onJoinEvent(notification.eventId, notification.socialHallId);
            onDismiss();
          }}
        />
      }
      dismissButton={
        <AlertNotification.DismissButton onClick={onDismiss}>
          {t('noumena.button.dismiss')}
        </AlertNotification.DismissButton>
      }
      onDismiss={onDismiss}
      {...rest}
    />
  ) : null;
};
