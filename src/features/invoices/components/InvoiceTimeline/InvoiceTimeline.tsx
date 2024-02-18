import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import {
  type InvoiceOutputFragment,
  useGetInvoiceTimeLinesQuery,
} from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { ActivityLog } from '@/components/ActivityLog';
import { Stack } from '@/layout';
import { TimelineListItem } from './TimelineListItem';
import S from './styles';

type InvoiceTimelineProps = {
  invoice: InvoiceOutputFragment;
};

export const InvoiceTimeline: React.FC<InvoiceTimelineProps> = ({
  invoice,
}) => {
  const { t } = useTranslation();

  const { data } = useGetInvoiceTimeLinesQuery({
    variables: {
      invoiceId: invoice.id,
      limit: 100,
      offset: 0,
    },
    fetchPolicy: 'cache-and-network',
  });

  const timeline = cleanList(data?.getInvoiceTimeLines?.data);

  return timeline.length ? (
    <S.PageCard>
      <Stack gap={16} vertical fullWidth>
        <TSpan font="heading-xs-bold">
          {t('noumena.invoices.timeline.heading')}
        </TSpan>
        <ActivityLog.List>
          {timeline.map((item) => (
            <TimelineListItem key={item._id} invoice={invoice} item={item} />
          ))}
        </ActivityLog.List>
      </Stack>
    </S.PageCard>
  ) : null;
};
