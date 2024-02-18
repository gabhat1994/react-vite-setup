import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/contexts';
import {
  type InvoiceOutputFragment,
  type InvoiceTimelineOutputFragment,
} from '@/apollo/graphql';
import { AllCurrencyEnum } from '@/apollo/generated/types';
import { TimelineUtils } from '../utils';

type UseInvoiceTimelineOptions = {
  item: InvoiceTimelineOutputFragment;
  invoice: InvoiceOutputFragment;
};

export function useInvoiceTimeline({
  item,
  invoice,
}: UseInvoiceTimelineOptions) {
  const { t } = useTranslation();
  const { user, isOpsUser } = useAuth();

  const currency = invoice.currency ?? AllCurrencyEnum.Usd;
  const buyer = invoice.invoiceTo;
  const serviceProvider = invoice.invoiceFrom;

  return TimelineUtils.getTimelineItemByType({
    currency,
    currentUserId: user?._id ?? '',
    buyer: buyer ?? undefined,
    serviceProvider: serviceProvider ?? undefined,
    item,
    t,
    isOpsUser,
  });
}
