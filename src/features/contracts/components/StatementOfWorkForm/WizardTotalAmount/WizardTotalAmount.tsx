import { sumBy } from 'lodash';
import { CurrencyEnum } from '@/apollo/generated/types';
import { TSpan } from '@/components/Typography';
import convertToCurrency from '@/utils/currencyToCurrency';

interface WizardTotalAmountProps {
  rows: { amount: number | undefined }[] | undefined;
}

export function WizardTotalAmount({ rows }: WizardTotalAmountProps) {
  return (
    <TSpan font="body-m-bold">
      Sum:{' '}
      {convertToCurrency(
        sumBy(rows, (row) => parseFloat(`${row.amount}`) || 0),
        CurrencyEnum.Usd,
        2,
      )}
    </TSpan>
  );
}
