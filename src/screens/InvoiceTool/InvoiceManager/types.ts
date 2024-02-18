import { type InvoiceStatusEnum, type InvoiceType } from '@/apollo/generated/types';

export type Filters = {
  customers?: string[];
  invoiceType?: InvoiceType[];
  limit?: number;
  noums?: string[];
  amountRange?: RangeFilter<number>;
  dateRange?: RangeFilter<string>;
  search?: string;
  status?: InvoiceStatusEnum[];
};

export type RangeFilter<T> = {
  from: T | undefined;
  to: T | undefined;
};
