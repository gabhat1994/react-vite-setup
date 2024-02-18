import { addDays } from 'date-fns';
import { type DeepPartialSkipArrayKey } from 'react-hook-form';
import {
  AllCurrencyEnum,
  type InvoiceDraftInput,
  type InvoiceLineItemInput,
  InvoiceStatusEnum,
  LateFeeType,
  PaymentTerms,
  type UpdateInvoiceDraftInput,
} from '@/apollo/generated/types';
import { type InvoiceOutputFragment } from '@/apollo/graphql';
import { type InvoiceFormValues } from '../hooks/useInvoiceForm';
import { DueDateOption, LateFeeOption } from '../types';

const serializeDueDate = (
  values: DeepPartialSkipArrayKey<InvoiceFormValues>,
) => {
  if (values.dueDate === DueDateOption.CUSTOM_DATE) {
    return values.customDueDate ? values.customDueDate?.toISOString() : null;
  }

  switch (values.dueDate) {
    case DueDateOption.TODAY:
      return new Date().toISOString();
    case DueDateOption.TOMORROW:
      return addDays(new Date(), 1).toISOString();
    case DueDateOption.SEVEN_DAYS:
      return addDays(new Date(), 7).toISOString();
    case DueDateOption.FOURTEEN_DAYS:
      return addDays(new Date(), 14).toISOString();
    case DueDateOption.THIRTY_DAYS:
      return addDays(new Date(), 30).toISOString();
    case DueDateOption.FORTY_FIVE_DAYS:
      return addDays(new Date(), 45).toISOString();
    case DueDateOption.SIXTY_DAYS:
      return addDays(new Date(), 60).toISOString();
    case DueDateOption.NINETY_DAYS:
      return addDays(new Date(), 90).toISOString();
    default:
      return undefined;
  }
};

const mapFromLateFeeOption = (lateFeeOption?: LateFeeOption) => {
  switch (lateFeeOption) {
    case LateFeeOption.FIXED_AMOUNT:
      return LateFeeType.Value;
    case LateFeeOption.PERCENTAGE:
      return LateFeeType.Percentage;
    case LateFeeOption.NO_LATE_FEE:
      return null;
    default:
      return null;
  }
};

const mapToLateFeeOption = (lateFeeType?: LateFeeType | null) => {
  switch (lateFeeType) {
    case LateFeeType.Percentage:
      return LateFeeOption.PERCENTAGE;
    case LateFeeType.Value:
      return LateFeeOption.FIXED_AMOUNT;
    default:
      return LateFeeOption.NO_LATE_FEE;
  }
};

const mapLineItems = (
  values?: Partial<InvoiceFormValues>,
): InvoiceLineItemInput[] =>
  (values?.lineItems || []).map((item) => ({
    taxRate: item.taxRate,
    taxLabel: item.taxName,
    currency: item.currency,
    description: item.description,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
  }));

const toDraftInput = (
  values: Partial<InvoiceFormValues> & {
    noumId: string;
  },
): InvoiceDraftInput => ({
  lineItems: mapLineItems(values),
  currency: values.currency,
  noumId: values.noumId,
  dueDate: serializeDueDate(values),
  issueDate: values.issueDate?.toISOString(),
  lateFeeType: mapFromLateFeeOption(values.lateFeeType) ?? undefined,
  lateFeeValue: values.lateFeeValue ?? undefined,
  notes: values.notes,
  paymentTerms: values.paymentTerms,
  invoiceFrom: values.serviceProviderId || undefined,
  invoiceTo: values.buyerId || undefined,
  invoiceNumber: values.invoiceNumber,
  logoUrl: values.logo,
  summary: values.summary,
});

const toUpdateInvoiceInput = (
  values: Partial<InvoiceFormValues>,
): UpdateInvoiceDraftInput => ({
  lineItems: mapLineItems(values),
  currency: values.currency,
  noumId: values.noumId,
  dueDate: serializeDueDate(values),
  issueDate: values.issueDate?.toISOString(),
  lateFeeType: mapFromLateFeeOption(values.lateFeeType),
  lateFeeValue: values.lateFeeValue ?? null,
  notes: values.notes,
  paymentTerms: values.paymentTerms,
  invoiceFrom: values.serviceProviderId || null,
  invoiceTo: values.buyerId || null,
  invoiceNumber: values.invoiceNumber,
  logoUrl: values.logo || null,
  summary: values.summary,
});

const fromInvoice = (
  invoice: InvoiceOutputFragment,
): Partial<InvoiceFormValues> => ({
  id: invoice.id ?? undefined,
  lineItems: invoice.lineItems?.map((item) => ({
    currency: item?.currency!,
    description: item?.description!,
    id: item?.id!,
    quantity: item?.quantity!,
    taxRate: item?.taxRate!,
    unitPrice: item?.unitPrice!,
    taxName: item?.taxLabel!,
  })),
  currency: invoice.currency ?? AllCurrencyEnum.Usd,
  noumId: invoice.noumId?._id ?? undefined,
  dueDate: invoice.dueDate
    ? DueDateOption.CUSTOM_DATE
    : DueDateOption.SEVEN_DAYS,
  customDueDate: invoice.dueDate ? new Date(invoice.dueDate) : undefined,
  issueDate: invoice.issueDate ? new Date(invoice.issueDate) : undefined,
  lateFeeType: mapToLateFeeOption(invoice.lateFeeType),
  lateFeeValue: invoice.lateFeeValue ?? undefined,
  summary: invoice.summary ?? undefined,
  paymentTerms: invoice.paymentTerms ?? PaymentTerms.FullPaymentAdvance,
  buyerId: invoice.invoiceTo?._id ?? undefined,
  serviceProviderId: invoice.invoiceFrom?._id ?? undefined,
  invoiceNumber: invoice.invoiceNumber ?? undefined,
  logo: invoice.logoUrl ?? undefined,
  notes: invoice.notes ?? undefined,
  status: invoice.status ?? InvoiceStatusEnum.Draft,
});

const getDefaultValues = ({
  id,
  noumId,
}: {
  id?: string;
  noumId?: string;
}): Partial<InvoiceFormValues> => ({
  id,
  noumId,
  buyerId: undefined,
  serviceProviderId: undefined,
  lineItems: [],
  currency: AllCurrencyEnum.Usd,
  dueDate: DueDateOption.TOMORROW,
  issueDate: new Date(),
  customDueDate: undefined,
  paymentTerms: PaymentTerms.FullPaymentAdvance,
  lateFeeType: LateFeeOption.NO_LATE_FEE,
  lateFeeValue: undefined,
  logo: undefined,
  notes: undefined,
  invoiceNumber: undefined,
  status: InvoiceStatusEnum.Draft,
  buyerDetailsComplete: false,
  serviceProviderDetailsComplete: false,
});

export const InvoiceFormMapper = {
  toDraftInput,
  fromInvoice,
  toUpdateInvoiceInput,
  getDefaultValues,
  serializeDueDate,
  mapFromLateFeeOption,
};
