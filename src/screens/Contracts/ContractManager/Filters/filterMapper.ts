import {
  type ContractFilter,
  type ContractStatus,
  type GetAllSowFilter,
  type SowStatus,
} from '@/apollo/generated/types';
import { DocumentType } from '@/features/contracts/types';
import { type ContractManagerSearchParams } from '@/features/contracts/utils/routes';
import { type Filters, ListPOV } from '../types';

function nullOnEmpty<T extends string | string[]>(
  array: T | undefined,
): T | null {
  return array && array.length > 0 ? array : null;
}

export function mapToContractListFilters(
  filters: Partial<Filters>,
): ContractFilter {
  return {
    search: nullOnEmpty(filters?.search),
    status: nullOnEmpty(filters?.statuses as ContractStatus[]),
    noumIds: nullOnEmpty(filters?.noumIds),
    consignors: nullOnEmpty(filters?.consignorIds),
  };
}

export function mapToStatementOfWorkListFilters(
  filters: Partial<Filters>,
): GetAllSowFilter {
  return {
    search: nullOnEmpty(filters?.search),
    status: nullOnEmpty(filters?.statuses as SowStatus[]),
    noumIds: nullOnEmpty(filters?.noumIds),
    consignors: nullOnEmpty(filters?.consignorIds),
  };
}

export function getDefaultFilterValues(
  searchParams: ContractManagerSearchParams,
): Filters {
  return {
    perspective: searchParams.perspective ?? ListPOV.Owner,
    search: '',
    type: searchParams.type ?? DocumentType.Contract,
    statuses: searchParams.status ? [searchParams.status] : undefined,
    consignorIds: undefined,
    noumIds: searchParams.noumId ? [searchParams.noumId] : undefined,
  };
}
