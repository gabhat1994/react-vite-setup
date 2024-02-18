import {
  type ContractListingPov,
  type ContractStatus,
  type SowStatus,
} from '@/apollo/generated/types';
import { type DocumentType } from '@/features/contracts/types';

export { ContractListingPov as ListPOV } from '@/apollo/generated/types';

type DocumentTypeFilter = DocumentType;
type StatusFilter = Array<ContractStatus | SowStatus>;
type NoumFilter = Array<string>;
type ConsignorFilter = Array<string>;

export type Filters = {
  perspective: ContractListingPov;
  search: string;
  type: DocumentTypeFilter;
  statuses?: StatusFilter;
  noumIds?: NoumFilter;
  consignorIds?: ConsignorFilter;
};
