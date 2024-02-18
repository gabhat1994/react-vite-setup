import { PushNotificationTypes } from '@/apollo/generated/types';

/**
 * Urgent notifications are those that require user's attention.
 * They are often displayed together with a sound effect or any other ways of grabbing user's attention.
 * In the future, we might add `urgent: boolean` flag to the payload, so it can be decided by BE or business.
 */
export const URGENT_NOTIFICATION_TYPES = [
  PushNotificationTypes.EventLive,
  PushNotificationTypes.EventInvitee,
  PushNotificationTypes.EventReminder,
  PushNotificationTypes.EventStarting,
  PushNotificationTypes.InstantEventInvitee,
];
