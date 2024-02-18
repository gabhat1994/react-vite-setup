import { TSpan } from '@/components/Typography';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack } from '@/layout';
import { cleanList } from '@/utils/list';
import { type InvoiceOutputFragment } from '@/apollo/graphql';
import FormSection from '../FormSection/FormSection';
import InvoiceItemsSummaryTable from '../InvoiceItemsSummaryTable/InvoiceItemsSummaryTable';
import S from './styles';

import AccountDetails from './AccountDetails';

type InvoiceSummaryProps = {
  invoice: InvoiceOutputFragment;
};

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ invoice }) => {
  const { isMobile } = useBreakpoints();

  return (
    <S.PageCard>
      <Stack vertical gap={16} fullWidth>
        <TSpan font="heading-xs-bold">Summary</TSpan>
        <Stack fullWidth vertical={isMobile} gap={isMobile ? 16 : 0}>
          <FormSection title="Recipient" sectionSeparator={false}>
            {invoice.invoiceTo ? (
              <AccountDetails contact={invoice.invoiceTo} />
            ) : null}
          </FormSection>

          <FormSection title="Service Provider" sectionSeparator={false}>
            {invoice.invoiceFrom ? (
              <AccountDetails contact={invoice.invoiceFrom} />
            ) : null}
          </FormSection>
        </Stack>

        {invoice.summary ? (
          <FormSection title="Attention">{invoice.summary}</FormSection>
        ) : null}

        {invoice.lineItems?.length ? (
          <FormSection title="Items" fullSize>
            <InvoiceItemsSummaryTable
              data={cleanList(invoice.lineItems)}
              currency={invoice.currency ?? undefined}
            />
          </FormSection>
        ) : null}

        {invoice.notes ? (
          <FormSection title="Notes">{invoice.notes}</FormSection>
        ) : null}
      </Stack>
    </S.PageCard>
  );
};

export default InvoiceSummary;
