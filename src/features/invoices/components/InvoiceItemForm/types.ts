import type * as yup from 'yup';
import { type invoiceItemSchema } from '../../hooks/useInvoiceForm';

export type InvoiceItemFormValues = yup.InferType<typeof invoiceItemSchema>;
