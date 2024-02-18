import { type AllCurrencyEnum } from '@/apollo/generated/types';

function getCurrencySymbol(currency?: AllCurrencyEnum) {
  if (!currency) {
    return '';
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const currencyPart = formatter
    .formatToParts(0)
    .find((part) => part.type === 'currency');

  return currencyPart?.value;
}

export default getCurrencySymbol;
