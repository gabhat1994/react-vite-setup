import {
  useInvoiceNotificationListener,
  usePushNotificationSound,
  useUserStatusListener,
} from '@/features/push-notifications/hooks';

export function PushNotificationListeners() {
  useUserStatusListener();
  usePushNotificationSound();
  useInvoiceNotificationListener();

  return null;
}
