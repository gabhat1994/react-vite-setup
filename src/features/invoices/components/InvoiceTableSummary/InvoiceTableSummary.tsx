import { sumBy } from 'lodash';
import { Stack } from '@/layout';
import {
  type AllCurrencyEnum,
  type InvoiceLineItemInput,
} from '@/apollo/generated/types';
import convertToCurrency from '@/utils/currencyToCurrency';
import { InvoiceUtils } from '../../utils/invoice';
import S from './styles';
import { type InvoiceItemFormValues } from '../InvoiceItemForm/types';

type InvoiceSummaryTableProps = {
  lineItems: (InvoiceLineItemInput | InvoiceItemFormValues)[];
  defaultTaxName?: string;
  defaultTaxRate?: number;
  currency?: AllCurrencyEnum;
};

const InvoiceSummaryTable: React.FC<InvoiceSummaryTableProps> = ({
  lineItems,
  currency,
}) => {
  const total = InvoiceUtils.getAllItemsTotalValue(lineItems);
  const subtotal = sumBy(lineItems, (item) =>
    InvoiceUtils.getItemSubtotalValue(item.quantity, item.unitPrice),
  );

  const taxItems = InvoiceUtils.getTaxItems(lineItems);

  return (
    <Stack justify="flex-end" shrink gap={64} fullWidth>
      <Stack vertical gap={8}>
        <S.SummaryText>Subtotal</S.SummaryText>
        {taxItems.map((item) => (
          <S.SummaryText key={item.taxSum}>
            Tax ({item.taxName ? `${item.taxName}: ` : ''} {item.taxRate}%)
          </S.SummaryText>
        ))}
        <S.SummaryText font="body-m-bold">Total</S.SummaryText>
      </Stack>

      <Stack vertical gap={8}>
        <S.SummaryText>
          {convertToCurrency(subtotal, currency, 2)}
        </S.SummaryText>
        {taxItems.map((item) => (
          <S.SummaryText key={item.taxSum}>
            {convertToCurrency(item.taxSum, currency, 2)}
          </S.SummaryText>
        ))}

        <S.SummaryText font="body-m-bold">
          {convertToCurrency(total, currency, 2)}
        </S.SummaryText>
      </Stack>
    </Stack>
  );
};

export default InvoiceSummaryTable;
