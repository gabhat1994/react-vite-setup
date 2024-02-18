import {
  type ContractFilter,
  ContractStatus,
  type GetAllSowFilter,
  SowStatus,
} from '@/apollo/generated/types';
import { type Filters, NoumDocumentStatus } from '../types';

function mapNoumDocumentStatusToContractStatus(
  filterValue: NoumDocumentStatus,
): ContractStatus | null {
  switch (filterValue) {
    case NoumDocumentStatus.Drafts:
      return ContractStatus.Draft;
    case NoumDocumentStatus.Sent:
      return ContractStatus.Issued;
    case NoumDocumentStatus.Signed:
      return ContractStatus.Signed;
    default:
      return null;
  }
}

function mapNoumDocumentStatusToSowStatus(
  filterValue: NoumDocumentStatus,
): SowStatus | null {
  switch (filterValue) {
    case NoumDocumentStatus.Drafts:
      return SowStatus.Draft;
    case NoumDocumentStatus.Sent:
      return SowStatus.Issued;
    case NoumDocumentStatus.Signed:
      return SowStatus.Signed;
    default:
      return null;
  }
}

function toContractsList(noumId: string, filters: Filters): ContractFilter {
  const status = mapNoumDocumentStatusToContractStatus(filters.status);

  return {
    noumIds: [noumId],
    status: status ? [status] : null,
  };
}

function toStatementsOfWorkList(
  noumId: string,
  filters: Filters,
): GetAllSowFilter {
  const status = mapNoumDocumentStatusToSowStatus(filters.status);

  return {
    noumIds: [noumId],
    status: status ? [status] : null,
  };
}

export const ContractElementMapper = {
  mapNoumDocumentStatusToContractStatus,
  mapNoumDocumentStatusToSowStatus,
  toContractsList,
  toStatementsOfWorkList,
};
