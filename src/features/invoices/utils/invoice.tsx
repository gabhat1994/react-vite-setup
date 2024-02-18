import { groupBy, isNumber, map, sumBy } from 'lodash';
import {
  AllCurrencyEnum,
  type InvoiceLineItemInput,
  InvoiceStatusEnum,
  LateFeeType,
  PaymentTerms,
} from '@/apollo/generated/types';
import { type Maybe } from '@/common/types';
import convertToCurrency from '@/utils/currencyToCurrency';

import {
  type DropdownItemType,
  type DropdownValueType,
} from '@/components/Dropdown';
import currencies from '@/assets/currencies';
import routes from '@/constants/routes';
import { generatePath } from 'react-router';
import { DueDateOption, LateFeeOption } from '../types';
import { type InvoiceItemFormValues } from '../components/InvoiceItemForm/types';
import { type InvoiceFormValues } from '../hooks/useInvoiceForm';

const getItemTotalValueWithCurrency = (
  quantity: number,
  unitPrice: number,
  tax: Maybe<number>,
  currency: AllCurrencyEnum = AllCurrencyEnum.Usd,
) => {
  const totalValue = getItemTotalValue(quantity, unitPrice, tax);
  return convertToCurrency(totalValue, currency, 2);
};

const formatAmount = (value: number | string) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const getAllItemsTotalValue = (
  items: (InvoiceLineItemInput | InvoiceItemFormValues)[],
) =>
  items.reduce(
    (acc, item) =>
      getItemTotalValue(item.quantity, item.unitPrice, item.taxRate || 0) + acc,
    0,
  );

const getItemTotalValue = (
  quantity: number,
  unitPrice: number,
  tax: Maybe<number>,
) => {
  const total = quantity * unitPrice;
  const totalValue = tax ? (tax / 100) * total + total : total;
  return totalValue;
};

const getItemTaxValue = (quantity: number, unitPrice: number, tax: number) =>
  (tax / 100) * quantity * unitPrice;

const getItemSubtotalValue = (quantity: number, unitPrice: number) =>
  quantity * unitPrice;

const isInvoiceEditable = (status?: InvoiceStatusEnum | null) =>
  status &&
  [InvoiceStatusEnum.Issued, InvoiceStatusEnum.Draft].includes(status);

const getLateFeeText = (
  lateFeeType?: LateFeeType | null,
  lateFeeValue?: number | null,
  currency?: AllCurrencyEnum | null,
) => {
  if (!lateFeeValue) {
    return 'No Late Fee';
  }
  if (lateFeeType === LateFeeType.Percentage) {
    return `${lateFeeValue}%`;
  }
  return convertToCurrency(lateFeeValue, currency!, 2);
};

const dueDateOptions: DropdownItemType<DueDateOption>[] = [
  {
    key: DueDateOption.TODAY,
    label: 'Today',
    type: 'value',
    value: DueDateOption.TODAY,
  },
  {
    key: DueDateOption.TOMORROW,
    label: 'Tomorrow',
    type: 'value',
    value: DueDateOption.TOMORROW,
  },
  {
    key: DueDateOption.SEVEN_DAYS,
    label: '7 Days',
    type: 'value',
    value: DueDateOption.SEVEN_DAYS,
  },
  {
    key: DueDateOption.FOURTEEN_DAYS,
    label: '14 Days',
    type: 'value',
    value: DueDateOption.FOURTEEN_DAYS,
  },
  {
    key: DueDateOption.THIRTY_DAYS,
    label: '30 Days',
    type: 'value',
    value: DueDateOption.THIRTY_DAYS,
  },
  {
    key: DueDateOption.FORTY_FIVE_DAYS,
    label: '45 Days',
    type: 'value',
    value: DueDateOption.FORTY_FIVE_DAYS,
  },
  {
    key: DueDateOption.SIXTY_DAYS,
    label: '60 Days',
    type: 'value',
    value: DueDateOption.SIXTY_DAYS,
  },
  {
    key: DueDateOption.NINETY_DAYS,
    label: '90 Days',
    type: 'value',
    value: DueDateOption.NINETY_DAYS,
  },
  {
    key: DueDateOption.CUSTOM_DATE,
    label: 'Custom date',
    type: 'value',
    value: DueDateOption.CUSTOM_DATE,
  },
];

const getGroupedItemsByTax = (
  lineItems: (InvoiceLineItemInput | InvoiceItemFormValues)[],
) =>
  groupBy(
    lineItems,
    (item) =>
      `${item.taxRate || 0}-${
        ('taxName' in item ? item.taxName : item.taxLabel) || ''
      }`,
  );

const getTaxItems = (
  lineItems: (InvoiceLineItemInput | InvoiceItemFormValues)[],
) =>
  map(getGroupedItemsByTax(lineItems), (items, key) => {
    const taxRate = Number(key.split('-')[0]);
    const taxName = key.split('-')[1];

    return {
      taxRate,
      taxName,
      taxSum: sumBy(items, (item) =>
        InvoiceUtils.getItemTaxValue(
          item.quantity,
          item.unitPrice,
          item.taxRate || 0,
        ),
      ),
    };
  }).filter((item) => isNumber(item.taxRate) && !!item.taxName);

const currencyOptions = Object.entries(currencies)
  .map(([symbol, value]) => ({
    key: symbol,
    label: value.name,
    type: 'value',
    value: symbol,
    icon: null,
  }))
  .filter((item) => !!item.value) as DropdownValueType<
  AllCurrencyEnum,
  string
>[];

function getCurrencyByCode(code: AllCurrencyEnum) {
  return currencyOptions.find(
    (item) => item.type === 'value' && item.value === code,
  );
}

const paymentTermsMap = {
  [PaymentTerms.InstallmentPayment]: 'Installment Payment',
  [PaymentTerms.MilestonePayment]: 'Milestone Payment',
  [PaymentTerms.FullPaymentAdvance]: 'Payable on or Before Due Date',
};

const paymentTermsOptions: DropdownItemType<string>[] = [
  {
    key: PaymentTerms.InstallmentPayment,
    label: paymentTermsMap[PaymentTerms.InstallmentPayment],
    type: 'value',
    value: PaymentTerms.InstallmentPayment,
  },
  {
    key: PaymentTerms.MilestonePayment,
    label: paymentTermsMap[PaymentTerms.MilestonePayment],
    type: 'value',
    value: PaymentTerms.MilestonePayment,
  },
  {
    key: PaymentTerms.FullPaymentAdvance,
    label: paymentTermsMap[PaymentTerms.FullPaymentAdvance],
    type: 'value',
    value: PaymentTerms.FullPaymentAdvance,
  },
];

const lateFeeOptions: DropdownItemType<string>[] = [
  {
    key: LateFeeOption.NO_LATE_FEE,
    label: 'No Late Fee',
    type: 'value',
    value: LateFeeOption.NO_LATE_FEE,
  },
  {
    key: LateFeeOption.PERCENTAGE,
    label: 'Percentage',
    type: 'value',
    value: LateFeeOption.PERCENTAGE,
  },
  {
    key: LateFeeOption.FIXED_AMOUNT,
    label: 'Fixed Fee',
    type: 'value',
    value: LateFeeOption.FIXED_AMOUNT,
  },
];

const getInvoiceFileName = (invoiceNumber: string) =>
  `INVOICE-${invoiceNumber}-NOUMENA.pdf`;

const issuedInvoiceNotEditableFields: (keyof InvoiceFormValues)[] = [
  'buyerId',
  'serviceProviderId',
  'noumId',
  'invoiceNumber',
];

const canEditField = (
  status: InvoiceStatusEnum,
  field: keyof InvoiceFormValues,
) => {
  if (status === InvoiceStatusEnum.Draft) {
    return true;
  }
  return !issuedInvoiceNotEditableFields.includes(field);
};

const createInvoicePath = {
  duplicateInvoice: (invoiceId: string) =>
    `${generatePath(routes.INVOICE_EDIT, {
      id: invoiceId,
    })}?duplicate=true`,
};

export const InvoiceUtils = {
  lateFeeOptions,
  paymentTermsOptions,
  currencyOptions,
  dueDateOptions,
  LateFeeOption,
  DueDateOption,
  getItemTotalValueWithCurrency,
  getItemTotalValue,
  getItemTaxValue,
  getItemSubtotalValue,
  isInvoiceEditable,
  getTaxItems,
  getLateFeeText,
  paymentTermsMap,
  getInvoiceFileName,
  canEditField,
  issuedInvoiceNotEditableFields,
  getAllItemsTotalValue,
  getCurrencyByCode,
  formatAmount,
  createInvoicePath,
};
