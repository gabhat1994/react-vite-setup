import { isNumber } from 'lodash';
import {
  type CommonFilter,
  FilterOperator,
  type InvoiceQueryInput,
  type InvoiceSortColumn,
  InvoiceSortType,
} from '@/apollo/generated/types';
import { cleanList } from '@/utils/list';
import {
  type DataGridSorting,
  type SortDirectionType,
} from '@/components/DataGrid/types';
import { type Filters } from './types';

function nullOnEmpty<T extends string | unknown[]>(array: T): T | null {
  return array.length > 0 ? array : null;
}

function mapToInvoiceQueryInput(
  filters: Filters,
  offset: number,
  sorting: DataGridSorting<InvoiceSortColumn> | null,
): InvoiceQueryInput {
  const {
    dateRange,
    amountRange,
    customers,
    invoiceType,
    noums,
    status,
    search,
    limit,
    ...rest
  } = filters;
  const { from: dateFrom, to: dateTo } = dateRange || {};
  const { from: amountFrom, to: amountTo } = amountRange || {};

  const amountFilter: CommonFilter | undefined =
    isNumber(amountFrom) &&
    (amountTo === AMOUNT_FILTER_MAX_VALUE || typeof amountTo === 'undefined')
      ? {
          column: 'amount',
          operator: FilterOperator.Gte,
          values: [String(amountFrom)],
        }
      : isNumber(amountTo) && typeof amountFrom === 'undefined'
      ? {
          column: 'amount',
          operator: FilterOperator.Lte,
          values: [String(amountTo)],
        }
      : isNumber(amountFrom) && isNumber(amountTo)
      ? {
          column: 'amount',
          operator: FilterOperator.Btwe,
          values: [String(amountFrom), String(amountTo)],
        }
      : undefined;

  const rangeFilter = cleanList([
    dateFrom || dateTo
      ? {
          column: 'issueDate',
          operator: FilterOperator.Btwe,
          values: [dateFrom ?? '', dateTo ?? ''],
        }
      : undefined,
    amountFilter,
  ]) as CommonFilter[];

  return {
    ...rest,
    rangeFilter,
    invoiceType: nullOnEmpty(invoiceType ?? []),
    customers: nullOnEmpty(customers ?? []),
    noums: nullOnEmpty(noums ?? []),
    status: nullOnEmpty(status ?? []),
    search: nullOnEmpty(search ?? ''),
    limit: limit ?? ITEMS_PER_PAGE,
    offset,
    sort: sorting
      ? {
          column: sorting.column,
          type: mapToInvoiceSortType(sorting.direction),
        }
      : null,
  };
}

function mapToInvoiceSortType(
  direction: SortDirectionType,
): InvoiceSortType | null {
  switch (direction) {
    case 'asc':
      return InvoiceSortType.Asc;
    case 'desc':
      return InvoiceSortType.Desc;
    default:
      return null;
  }
}

const ITEMS_PER_PAGE = 10;

const AMOUNT_FILTER_MAX_VALUE = 10000;

export const InvoiceFiltersUtils = {
  mapToInvoiceQueryInput,
  ITEMS_PER_PAGE,
  AMOUNT_FILTER_MAX_VALUE,
};
