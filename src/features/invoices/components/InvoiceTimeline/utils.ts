import { type DefaultNamespace, type TFunction } from 'react-i18next';
import {
  type AllCurrencyEnum,
  InvoiceActivityType,
  InvoiceStatusEnum,
} from '@/apollo/generated/types';
import convertToCurrency from '@/utils/currencyToCurrency';
import {
  type InvoiceTimelineOutputFragment,
  type NoumContactBasicFragment,
} from '@/apollo/graphql';
import { type TimelineActivityType } from './types';

function getStatusTranslationKey(status?: InvoiceStatusEnum): string {
  switch (status) {
    case InvoiceStatusEnum.Draft:
      return 'noumena.invoices.status.draft';
    case InvoiceStatusEnum.Issued:
      return 'noumena.invoices.status.issued';
    case InvoiceStatusEnum.Paid:
      return 'noumena.invoices.status.paid';
    case InvoiceStatusEnum.Overdue:
      return 'noumena.invoices.status.overdue';
    case InvoiceStatusEnum.Cancelled:
      return 'noumena.invoices.status.cancelled';
    case InvoiceStatusEnum.PartiallyPaid:
      return 'noumena.invoices.status.partially_paid';
    case InvoiceStatusEnum.WriteOff:
      return 'noumena.invoices.status.write_off';
    default:
      return '';
  }
}

function createUsersMapEntry(
  contact: NoumContactBasicFragment | undefined,
): Record<string, string> | undefined {
  if (!contact || !contact.userId._id || !contact.displayName) {
    return undefined;
  }

  return {
    [contact.userId._id]: contact.displayName,
  };
}

function getTimelineItemByType({
  item,
  currency,
  currentUserId,
  serviceProvider,
  buyer,
  t,
  isOpsUser,
}: {
  item: InvoiceTimelineOutputFragment;
  currency: AllCurrencyEnum;
  buyer?: NoumContactBasicFragment;
  serviceProvider?: NoumContactBasicFragment;
  currentUserId: string;
  t: TFunction<DefaultNamespace, undefined>;
  isOpsUser: boolean;
}): TimelineActivityType | null {
  const usersMap = {
    ...createUsersMapEntry(buyer),
    ...createUsersMapEntry(serviceProvider),
  };
  const isDoneByCurrentUser = currentUserId === item.userId?._id;
  const oppositeUserId =
    buyer?.userId._id === currentUserId
      ? serviceProvider?.userId._id
      : buyer?.userId._id;

  const userDisplayName = isDoneByCurrentUser
    ? 'You'
    : (item.userId ? usersMap[item?.userId?._id] : undefined) ?? 'Unknown User';

  const oppositeUserDisplayName = usersMap[oppositeUserId ?? ''];

  switch (item.activityType) {
    case InvoiceActivityType.InvoiceCreated:
      if (item.duplicatedFrom && isDoneByCurrentUser) {
        return {
          translation: {
            key: 'noumena.invoices.timeline.duplicated',
            values: {
              invoiceNumber: item.duplicatedFrom,
            },
          },
          icon: 'check_xs',
        };
      }

      if (item.toStatus === InvoiceStatusEnum.Draft) {
        return {
          translation: {
            key: 'noumena.invoices.timeline.drafted',
          },
          icon: 'check_xs',
        };
      }

      return {
        translation: {
          key: 'noumena.invoices.timeline.created',
        },
        icon: 'check_xs',
      };

    case InvoiceActivityType.StatusChanged:
      return {
        translation: {
          key: 'noumena.invoices.timeline.status_changed',
          values: {
            status: t(getStatusTranslationKey(item.toStatus ?? undefined)),
          },
        },
        icon: 'transfer_m',
      };
    case InvoiceActivityType.Paid: {
      const buyerDisplayName =
        buyer?.userId._id === currentUserId ? 'You' : buyer?.displayName;

      return {
        translation:
          (item.remainingAmount ?? 0) > 0
            ? {
                key: 'noumena.invoices.timeline.partially_paid',
                values: {
                  user: buyerDisplayName,
                  amount: convertToCurrency(item.amount ?? 0, currency),
                  remainingAmount: convertToCurrency(
                    item.remainingAmount ?? 0,
                    currency,
                  ),
                },
              }
            : {
                key: 'noumena.invoices.timeline.paid',
                values: {
                  user: buyerDisplayName,
                  amount: convertToCurrency(item.amount ?? 0, currency),
                },
              },
        icon: 'wallet_m',
      };
    }
    case InvoiceActivityType.Reminder:
      return {
        translation: {
          key: 'noumena.invoices.timeline.reminder',
          values: {
            user: userDisplayName,
          },
        },
        icon: 'notifications_m',
      };
    case InvoiceActivityType.InvoiceSent:
      if (isOpsUser) {
        return {
          translation: {
            key: 'noumena.invoices.timeline.sent',
            values: {
              user: usersMap[serviceProvider?.userId?._id ?? ''],
            },
          },
          icon: 'send_m_1',
        };
      }
      return {
        translation: isDoneByCurrentUser
          ? {
              key: 'noumena.invoices.timeline.received',
              values: {
                user: oppositeUserDisplayName,
              },
            }
          : {
              key: 'noumena.invoices.timeline.sent',
              values: {
                user: oppositeUserDisplayName,
              },
            },
        icon: 'send_m_1',
      };
    case InvoiceActivityType.InvoiceEdited:
      return {
        translation: {
          key: 'noumena.invoices.timeline.edited',
          values: {
            user: userDisplayName,
          },
        },
        icon: 'edit_m',
      };
    case InvoiceActivityType.PaymentFailed:
      return {
        translation: {
          key: 'noumena.invoices.timeline.declined',
        },
        icon: 'close_m',
      };
    case InvoiceActivityType.DueDateChanged:
      return {
        translation: {
          key: 'noumena.invoices.timeline.due_date_changed',
          values: {
            user: userDisplayName,
          },
        },
        icon: 'time_m',
      };
    default:
      return null;
  }
}

export const TimelineUtils = {
  getTimelineItemByType,
  getStatusTranslationKey,
};
