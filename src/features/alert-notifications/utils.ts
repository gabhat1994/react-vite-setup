import { type AlertNotification } from '@/providers/AlertNotificationsProvider';
import { differenceInMinutes } from 'date-fns';

export const isNotificationExpired = (notification: AlertNotification) =>
  differenceInMinutes(new Date(), new Date(notification.createdAt)) >= 5;
