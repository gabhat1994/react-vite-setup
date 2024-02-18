import { format } from 'date-fns';
import { isNumber, sumBy } from 'lodash';
import { type DeepPartialSkipArrayKey } from 'react-hook-form';
import convertToCurrency from '@/utils/currencyToCurrency';
import {
  type InvoiceLineItemInput,
  type InvoicePdfInput,
} from '@/apollo/generated/types';
import { type SelectedContact } from '@/features/noumContacts/types';
import { base64ToDataString } from '@/utils/base64ToBlob';
import { getCountryByCode } from '@/utils/country';
import { InvoiceFormMapper } from './invoiceFormMapper';
import { InvoiceUtils } from './invoice';
import { type InvoiceFormValues } from '../hooks/useInvoiceForm';
import { type InvoiceItemFormValues } from '../components/InvoiceItemForm/types';

const toBase64Data = (base64?: string | null | undefined) =>
  base64 ? base64ToDataString(base64, 'application/pdf') : undefined;

const toInvoicePDFPreview = (
  values: DeepPartialSkipArrayKey<InvoiceFormValues>,
  buyer?: SelectedContact | null,
  serviceProvider?: SelectedContact | null,
): InvoicePdfInput => ({
  receiver: {
    address: buyer
      ? [
          buyer.apartmentNo || buyer.street
            ? `${buyer.apartmentNo ?? ''} ${buyer.street ?? ''}`
            : '',
          buyer.city ?? '',
          `${buyer.state}, ${buyer.zipCode}`,
          getCountryByCode(buyer.country)?.name ?? '',
        ]
      : [],
    email: null,
    name: buyer?.name,
  },
  sender: {
    address: serviceProvider
      ? [
          `${serviceProvider.apartmentNo} ${serviceProvider.street}`,
          serviceProvider.city ?? '',
          `${serviceProvider.state}, ${serviceProvider.zipCode}`,
          getCountryByCode(serviceProvider.country)?.name ?? '',
        ]
      : [],
    email: null,
    name: serviceProvider?.name,
  },
  invoiceDetails: {
    currency: values.currency,
    due: values
      ? format(
          new Date(InvoiceFormMapper.serializeDueDate(values)!),
          'dd MMM yyyy',
        )
      : '',
    latefee: InvoiceUtils.getLateFeeText(
      InvoiceFormMapper.mapFromLateFeeOption(values.lateFeeType),
      values.lateFeeValue,
      values.currency,
    ),
    date: values.issueDate ? format(values.issueDate, 'dd MMM yyyy') : '',
    number: values.invoiceNumber,
    terms: values.paymentTerms
      ? InvoiceUtils.paymentTermsMap[values.paymentTerms]
      : '',
    title: '',
  },
  items: values.lineItems?.map((item) => ({
    amount: convertToCurrency(
      InvoiceUtils.getItemTotalValue(
        item.quantity ?? 0,
        item.unitPrice ?? 0,
        item.taxRate,
      ),
      values.currency,
    ),
    description: item.description,
    price: convertToCurrency(item.unitPrice || 0, values.currency),
    quantity: String(item.quantity),
    tax: isNumber(item.taxRate) ? `${item.taxRate}%` : '',
  })),
  summary: {
    subTotal: convertToCurrency(
      sumBy(values.lineItems, (item) =>
        InvoiceUtils.getItemSubtotalValue(
          item.quantity ?? 0,
          item.unitPrice ?? 0,
        ),
      ),
      values.currency,
    ),
    taxes: InvoiceUtils.getTaxItems(
      (values.lineItems as InvoiceLineItemInput[]) || [],
    )?.map((item) => ({
      title: `${item.taxName} (${item.taxRate || 0}%)`,
      value: convertToCurrency(item.taxSum ?? 0, values.currency),
    })),
    total: convertToCurrency(
      InvoiceUtils.getAllItemsTotalValue(
        values.lineItems as InvoiceItemFormValues[],
      ),
      values.currency,
    ),
  },
  footer: {
    text: values.notes,
  },
  logo: values.logo
    ? {
        image: values.logo,
      }
    : undefined,
  subject: values.summary,
  title: 'Invoice',
});

export const InvoicePreviewUtils = {
  toBase64Data,
  toInvoicePDFPreview,
};
