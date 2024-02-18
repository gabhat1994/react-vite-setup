import { AlertNotification } from '@/components/AlertNotification';
import { useEventHandlers } from '@/features/events/hooks';
import { EventUtils } from '@/utils/event';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { type AlertNotificationGatewayProps } from '../../AlertNotificationGateway';

type SocialHallRegularEventLiveProps = AlertNotificationGatewayProps;

export const SocialHallRegularEventLive: React.FC<
  SocialHallRegularEventLiveProps
> = ({ onDismiss, notification, ...rest }) => {
  const { eventTitle } = notification;
  const { t } = useTranslation();
  const { onJoinEvent } = useEventHandlers({});

  return EventUtils.isParticipant(notification.userRole) ? (
    <AlertNotification.Card
      title={eventTitle}
      body={t(
        'noumena.alert_notifications.sh_regular_event_live_participant.body',
      )}
      icon="calendar_xs"
      confirmButton={
        <AlertNotification.ConfirmButton
          onClick={() => {
            onJoinEvent(notification.eventId, notification.socialHallId);
            onDismiss();
          }}
        >
          {t(
            'noumena.alert_notifications.sh_regular_event_live_participant.confirm_button',
          )}
        </AlertNotification.ConfirmButton>
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
