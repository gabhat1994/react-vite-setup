import { generatePath } from 'react-router';
import routes from '@/constants/routes';
import { type ContractStatus, type SowStatus } from '@/apollo/generated/types';
import { type ListPOV } from '@/screens/Contracts/ContractManager/types';
import { formatRouteUrl } from '@/utils/routes';
import { type DocumentType } from '../types';

export type ContractManagerSearchParams = {
  noumId?: string;
  type?: DocumentType;
  status?: ContractStatus | SowStatus;
  perspective?: ListPOV;
};

type ContractCreateSearchParams = {
  noumId?: string;
};
type ContractEditSearchParams = {
  id: string;
  noumId?: string;
};
type ContractViewSearchParams = {
  id: string;
};

type StatementOfWorkCreateSearchParams = {
  noumId?: string;
};
type StatementOfWorkEditSearchParams = {
  id: string;
  noumId?: string;
};
type StatementOfWorkViewSearchParams = {
  id: string;
};

export const ContractToolRoutes = {
  contractManager: ({ ...searchParams }: ContractManagerSearchParams = {}) =>
    formatRouteUrl(routes.CONTRACT_MANAGER, searchParams),
  createContract: ({ ...searchParams }: ContractCreateSearchParams) =>
    formatRouteUrl(routes.CONTRACT_CREATE, searchParams),
  editContract: ({ id, ...searchParams }: ContractEditSearchParams) =>
    formatRouteUrl(generatePath(routes.CONTRACT_EDIT, { id }), searchParams),
  viewContract: ({ id, ...searchParams }: ContractViewSearchParams) =>
    formatRouteUrl(generatePath(routes.CONTRACT_PREVIEW, { id }), searchParams),
  createStatementOfWork: ({
    ...searchParams
  }: StatementOfWorkCreateSearchParams) =>
    formatRouteUrl(routes.STATEMENT_OF_WORK_CREATE, searchParams),
  editStatementOfWork: ({
    id,
    ...searchParams
  }: StatementOfWorkEditSearchParams) =>
    formatRouteUrl(
      generatePath(routes.STATEMENT_OF_WORK_EDIT, { id }),
      searchParams,
    ),
  viewStatementOfWork: ({
    id,
    ...searchParams
  }: StatementOfWorkViewSearchParams) =>
    formatRouteUrl(
      generatePath(routes.STATEMENT_OF_WORK_PREVIEW, { id }),
      searchParams,
    ),
};
