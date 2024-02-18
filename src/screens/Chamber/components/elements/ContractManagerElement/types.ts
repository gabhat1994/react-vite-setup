import {
  type ContractBasic,
  type StatementOfWorkBasic,
  type DocumentType,
} from '@/features/contracts/types';
import {
  type ElementOutput,
  type ContractListingPov,
} from '@/apollo/generated/types';
import {
  type GetContractsQuery,
  type GetStatementsOfWorkQuery,
} from '@/apollo/graphql';
import { type NoumLayoutViewMode } from '@/features/conversation/types';
import { type ElementWrapperProps } from '../../ElementWrapper';

export type ContractManagerElementProps = ElementWrapperProps;

export type EmptyElementProps = {
  isOwner?: boolean;
  handleNewContract: () => void;
  handleNewStatementOfWork: () => void;
};
// TODO: Remove once BE implements their own.
export enum NoumDocumentStatus {
  All = 'All',
  Drafts = 'Drafts',
  Sent = 'Sent',
  Signed = 'Signed',
}

export type Filters = {
  type: DocumentType;
  status: NoumDocumentStatus;
  listPerspective: ContractListingPov;
};

export type FilterType = {
  filterType?: DocumentType;
  isOwner?: boolean;
  isEmpty?: boolean;
};

export type ContractManagerProp = {
  /** @deprecated To be replaced with element permissions. */
  isOwner: boolean | undefined;
  spaceId: string;
  ROWS_PER_PAGE?: number;
} & FilterType;

export type ContractManagerViewProp = {
  element: ElementOutput;
  currentTitle?: string;
  isEditing: boolean;
} & ContractManagerProp;

export type FiltersProps = {
  filters: Filters;
  setFilters: (newFilters: Filters) => void;
} & FilterType;

export type ContractManagerHeaderProps = {
  setIsCollapse: (value: boolean) => void;
  handleNewContract: () => void;
  handleNewStatementOfWork: () => void;
} & ContractManagerViewProp;

export type ContractViewAllModalProp = {
  isOpen: boolean;
  onClose: () => void;
  handleNewContract: () => void;
  handleNavigateToContractManager: () => void;
} & ContractManagerProp;

export type BodyViewModeProps = {
  isLoading: boolean;
  isContract: boolean;
  contracts: GetContractsQuery['getContractList']['data'];
  statementsOfWork: GetStatementsOfWorkQuery['getAllSOW']['data'];
  handleNavigateToContract: (item: ContractBasic) => void;
  handleNavigateToStatementOfWork: (item: StatementOfWorkBasic) => void;
  rowsPerPage?: number;
  layoutMode: NoumLayoutViewMode;
};

export type InfiniteState =
  | 'loading'
  | 'hasNextPage'
  | 'end'
  | 'end-with-force';
