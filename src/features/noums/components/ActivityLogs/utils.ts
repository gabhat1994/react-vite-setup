import {
  type AllCurrencyEnum,
  AppActivityTypes,
} from '@/apollo/generated/types';
import { type AppActivityFragment } from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown';
import convertToCurrency from '@/utils/currencyToCurrency';
import { UserUtil } from '@/utils/user';

function getTranslationByType({ item }: { item: AppActivityFragment }) {
  const [targetUser] = item.targetUsers ?? [];

  switch (item.type) {
    case AppActivityTypes.PostCreation:
      return {
        key: 'noumena.noum_member_details.activity_logs.post_added',
        values: {
          user: UserUtil.renderFullName(item.sourceUser),
        },
      };
    case AppActivityTypes.MembersInvited:
      if (item.payload?.noumMember?.role.isManager) {
        return {
          key: 'noumena.noum_member_details.activity_logs.manager_invited',
          values: {
            sourceUser: UserUtil.renderFullName(item.sourceUser),
            targetUser: UserUtil.renderFullName(targetUser),
          },
        };
      }

      return {
        key: 'noumena.noum_member_details.activity_logs.member_invited',
        values: {
          sourceUser: UserUtil.renderFullName(item.sourceUser),
          targetUser: UserUtil.renderFullName(targetUser),
        },
      };
    case AppActivityTypes.MessageSent:
      return {
        key: 'noumena.noum_member_details.activity_logs.message_sent',
        values: {
          sourceUser: UserUtil.renderFullName(item.sourceUser),
          targetUser: UserUtil.renderFullName(targetUser),
        },
      };
    case AppActivityTypes.EventHosted:
      return {
        key: 'noumena.noum_member_details.activity_logs.event_hosted',
        values: {
          user: UserUtil.renderFullName(item.sourceUser),
          eventName: item.payload?.event?.title,
        },
      };
    case AppActivityTypes.Transaction:
      if (item.payload?.payment?.invoice?.id) {
        return {
          key: 'noumena.noum_member_details.activity_logs.invoice_payment',
          values: {
            user: UserUtil.renderFullName(item.sourceUser),
            amount: convertToCurrency(
              item.payload?.payment?.amount ?? 0,
              item.payload?.payment.currency as AllCurrencyEnum.Usd,
            ),
            invoiceNumber: item.payload?.payment?.invoice?.invoiceNumber,
          },
        };
      }
      return {
        key: 'noumena.noum_member_details.activity_logs.transaction',
        values: {
          user: UserUtil.renderFullName(item.sourceUser),
          amount: convertToCurrency(
            item.payload?.payment?.amount ?? 0,
            item.payload?.payment?.currency as AllCurrencyEnum.Usd,
          ),
          sourceWallet: item.sourceNoum?.name,
          targetWallet: item.targetNoum?.name,
        },
      };

    default:
      return null;
  }
}

const filterDropdownOptions: DropdownValueType<
  AppActivityTypes,
  AppActivityTypes
>[] = [
  {
    label: 'Posts Posted',
    key: AppActivityTypes.PostCreation,
    type: 'value',
    value: AppActivityTypes.PostCreation,
  },
  {
    label: 'Messages Sent',
    key: AppActivityTypes.MessageSent,
    type: 'value',
    value: AppActivityTypes.MessageSent,
  },
  {
    label: 'Members Invited',
    key: AppActivityTypes.MembersInvited,
    type: 'value',
    value: AppActivityTypes.MembersInvited,
  },
  {
    label: 'Transactions',
    key: AppActivityTypes.Transaction,
    type: 'value',
    value: AppActivityTypes.Transaction,
  },
  {
    label: 'Events Hosted',
    key: AppActivityTypes.EventHosted,
    type: 'value',
    value: AppActivityTypes.EventHosted,
  },
];

export const ActivityLogsUtils = {
  getTranslationByType,
  filterDropdownOptions,
};
