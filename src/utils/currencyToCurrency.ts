import { type AllCurrencyEnum, CurrencyEnum } from '@/apollo/generated/types';

/**
 * Convert number to given currency.
 *
 * @param {string} targetCurrency target currency.
 * @param {number} amount amount.
 */
const convertToCurrency = (
  amount: number,
  targetCurrency: CurrencyEnum | AllCurrencyEnum = CurrencyEnum.Usd,
  minimumFractionDigits: number = 0,
) => {
  if (typeof amount !== 'number') {
    throw Error('Invalid amount parameter to convertToCurrency function');
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: targetCurrency,
    minimumFractionDigits,
  });
  return formatter.format(Number.isNaN(amount) ? 0 : amount);
};

export default convertToCurrency;
