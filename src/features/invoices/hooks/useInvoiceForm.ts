import { type DefaultValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  AllCurrencyEnum,
  InvoiceStatusEnum,
  PaymentTerms,
} from '@/apollo/generated/types';
import { ALPHANUMERIC_REGEX } from '@/components/TextField/utils';
import { DueDateOption, LateFeeOption } from '../types';

const MAX_AMOUNT = 999999999999;
export type InvoiceFormValues = yup.InferType<typeof invoiceFormSchema>;

interface UseInvoiceFormOptions {
  defaultValues?: DefaultValues<InvoiceFormValues>;
}

export const invoiceItemSchema = yup.object({
  id: yup.string().required(),
  unitPrice: yup.number().min(1).label('Unit Price').required(),
  quantity: yup.number().min(1).label('Quantity').required().max(999),
  description: yup.string().label('Service Name').required().max(3000),
  taxName: yup.string().optional().nullable(),
  taxRate: yup
    .number()
    .optional()
    .max(100)
    .nullable()
    .when('taxName', {
      is: (value: number) => !!value,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
  currency: yup
    .mixed<AllCurrencyEnum>()
    .oneOf(Object.values(AllCurrencyEnum))
    .required(),
});

export const invoiceFormSchema = yup.object({
  id: yup.string().optional(),
  noumId: yup
    .string()
    .required('You have to assign a Noum to your invoice')
    .label('Noum Assignment'),
  invoiceNumber: yup
    .string()
    .label('Invoice No.')
    .when('noumId', {
      is: (value: string) => !!value,
      then: (schema) => schema.required().matches(ALPHANUMERIC_REGEX),
    }),
  buyerId: yup.string().label('Recipient').required(),
  serviceProviderId: yup.string().label('Service Provider').required(),
  lineItems: yup.array(invoiceItemSchema).label('Items').required().min(1),
  defaultTaxRate: yup.number().optional(),
  defaultTaxName: yup.string().optional(),
  issueDate: yup.date().label('Issue Date').required(),
  lateFeeType: yup
    .mixed<LateFeeOption>()
    .oneOf(Object.values(LateFeeOption))
    .required(),
  status: yup
    .mixed<InvoiceStatusEnum>()
    .oneOf(Object.values(InvoiceStatusEnum))
    .required(),
  dueDate: yup
    .mixed<DueDateOption>()
    .oneOf(Object.values(DueDateOption))
    .required(),
  currency: yup
    .mixed<AllCurrencyEnum>()
    .oneOf(Object.values(AllCurrencyEnum))
    .required(),
  notes: yup.string().label('Notes').optional().max(200),
  summary: yup.string().label('Attention').optional().max(200),
  logo: yup.string().label('Logo').optional(),
  buyerDetailsComplete: yup.boolean().is([true]),
  serviceProviderDetailsComplete: yup.boolean().is([true]),
  paymentTerms: yup
    .mixed<PaymentTerms>()
    .oneOf(Object.values(PaymentTerms))
    .label('Payment Terms')
    .required(),
  customDueDate: yup
    .date()
    .label('Due date')
    .when('dueDate', {
      is: DueDateOption.CUSTOM_DATE,
      then: (schema) => schema.required(),
    }),
  lateFeeValue: yup
    .number()
    .label('Late Fee')
    .when('lateFeeType', {
      is: LateFeeOption.FIXED_AMOUNT,
      then: (schema) => schema.min(1).max(MAX_AMOUNT).required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .when('lateFeeType', {
      is: LateFeeOption.PERCENTAGE,
      then: (schema) => schema.min(1).max(100).required(),
      otherwise: (schema) => schema.notRequired().max(MAX_AMOUNT),
    }),
});

export function useInvoiceForm({ defaultValues }: UseInvoiceFormOptions = {}) {
  return useForm<InvoiceFormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(invoiceFormSchema),
  });
}
