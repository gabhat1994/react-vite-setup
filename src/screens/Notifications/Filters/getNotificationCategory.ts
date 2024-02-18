import { NotificationCategory } from '@/apollo/generated/types';
import { NotificationFilterCategory } from '../types';

export function getNotificationCategory(
  category: NotificationFilterCategory,
): NotificationCategory | null {
  switch (category) {
    case NotificationFilterCategory.All:
      return null;
    case NotificationFilterCategory.Community:
      return NotificationCategory.Community;
    case NotificationFilterCategory.Noums:
      return NotificationCategory.Noums;
    case NotificationFilterCategory.Money:
      return NotificationCategory.Money;
    case NotificationFilterCategory.Other:
      return NotificationCategory.Other;
    default:
      return null;
  }
}
