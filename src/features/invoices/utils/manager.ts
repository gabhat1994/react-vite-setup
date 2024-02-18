import { type AllCurrencyEnum } from '@/apollo/generated/types';
import convertToCurrency from '@/utils/currencyToCurrency';

const formatAmount = (amount: number, currency?: AllCurrencyEnum) =>
  convertToCurrency(amount, currency);

export const InvoiceManagerUtils = { formatAmount };
