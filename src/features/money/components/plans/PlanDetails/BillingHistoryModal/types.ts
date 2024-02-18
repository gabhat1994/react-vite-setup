import { type SubscriptionInvoicesFragment } from '@/apollo/graphql/fragments/subscription.generated';

export interface IBillingHistoryModal {
  open: boolean;
  onClose: () => void;
  allInvoices: SubscriptionInvoicesFragment[];
}
