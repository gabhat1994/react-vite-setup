import { type InvoiceOutputFragment } from '@/apollo/graphql';
import { Tag } from '@/components/Tag';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import convertToCurrency from '@/utils/currencyToCurrency';
import { format } from 'date-fns';
import S from './styles';

import useInvoicePermissions from '../../hooks/useInvoicePermissions';
import InvoiceStatusBadge from '../InvoiceStatusBadge/InvoiceStatusBadge';

type PlanDetailsProps = {
  invoice: InvoiceOutputFragment;
};

const PlanDetails: React.FC<PlanDetailsProps> = ({ invoice }) => {
  const { isNoumOwner } = useInvoicePermissions();

  return (
    <S.PageCard>
      <Stack justify="space-between">
        <Stack vertical gap={16}>
          <Stack align="center" gap={8}>
            <TSpan
              colorToken="--text-card-neutral-highlighted"
              font="heading-xs-bold"
            >
              {invoice.invoiceNumber}
            </TSpan>
            {invoice.amount ? (
              <TSpan
                colorToken="--text-card-neutral-highlighted"
                font="body-xl"
              >
                for{' '}
                {convertToCurrency(
                  invoice.amount,
                  invoice.currency ?? undefined,
                  2,
                )}
              </TSpan>
            ) : null}

            {invoice.duplicatedFromInvoiceNumber && isNoumOwner(invoice) ? (
              <Tag size="medium" tertiary>
                Duplicated from {invoice.duplicatedFromInvoiceNumber}
              </Tag>
            ) : null}
          </Stack>

          <Stack align="center" gap={8}>
            <TSpan font="body-m" colorToken="--text-card-neutral-default">
              Payment Due:
            </TSpan>
            <TSpan
              font="body-m-bold"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {invoice.issueDate
                ? format(new Date(invoice.dueDate), 'dd MMM yyyy')
                : null}
            </TSpan>
          </Stack>
        </Stack>

        <InvoiceStatusBadge status={invoice?.status} />
      </Stack>
    </S.PageCard>
  );
};

export default PlanDetails;
