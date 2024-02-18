import { PushNotificationTypes } from '@/apollo/generated/types';
import {
  type AlertNotification,
  type SupportedAlertNotificationTypes,
} from '@/providers/AlertNotificationsProvider';
import React, { useEffect, useRef } from 'react';
import { SocialHallRegularEventLive } from '../notifications/SocialHallRegularEventLive';
import { SocialHallRegularEventStarting } from '../notifications/SocialHallRegularEventStarting';
import { isNotificationExpired } from '../utils';

export type AlertNotificationGatewayProps = {
  onDismiss: () => void;
  notification: AlertNotification;
  bottomGap?: boolean;
};

const ComponentsMap: Record<
  SupportedAlertNotificationTypes,
  React.FC<AlertNotificationGatewayProps> | null
> = {
  [PushNotificationTypes.EventLive]: SocialHallRegularEventLive,
  [PushNotificationTypes.EventStarting]: SocialHallRegularEventStarting,
  [PushNotificationTypes.EventDeleted]: null,
};

export const AlertNotificationGateway: React.FC<
  AlertNotificationGatewayProps
> = ({ onDismiss, notification, bottomGap }) => {
  const Component = ComponentsMap[notification.pnId];

  const interval = useRef<NodeJS.Timer>();

  useEffect(() => {
    interval.current = setInterval(() => {
      if (isNotificationExpired(notification)) {
        onDismiss();
      }
    }, 6000 * 10);

    return () => {
      clearInterval(interval.current);
    };
  }, [notification, notification.pnId, onDismiss]);

  return Component ? (
    <Component
      onDismiss={onDismiss}
      notification={notification}
      bottomGap={bottomGap}
    />
  ) : null;
};
