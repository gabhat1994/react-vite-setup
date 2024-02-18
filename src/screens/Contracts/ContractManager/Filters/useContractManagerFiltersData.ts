import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { type ContractStatus, DocumentType } from '@/features/contracts/types';
import { type SowStatus } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';
import {
  useGetConsignorsQuery,
  useGetNoumsLinkedToContractsQuery,
  useGetNoumsLinkedToSoWsQuery,
} from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import {
  getAvailableContractStatuses,
  getAvailableStatementOfWorkStatuses,
  mapConsignorToOption,
  mapContractStatusToOption,
  mapNoumToOption,
  mapSowStatusToOption,
} from './filterOptionMapper';
import { type ListPOV } from '../types';

interface UseContractManagerFiltersDataOptions {
  listPerspective: ListPOV;
  documentType: DocumentType;
}

export function useContractManagerFiltersData({
  listPerspective,
  documentType,
}: UseContractManagerFiltersDataOptions) {
  const { t } = useTranslation();

  const { data: contractNoums, loading: contractNoumsLoading } =
    useGetNoumsLinkedToContractsQuery({
      variables: {
        pov: listPerspective,
      },
      skip: documentType !== DocumentType.Contract,
    });

  const { data: statementOfWorkNoums, loading: statementOfWorkNoumsLoading } =
    useGetNoumsLinkedToSoWsQuery({
      variables: {
        pov: listPerspective,
      },
      skip: documentType !== DocumentType.Sow,
    });

  const { data: consignorsData, loading: consignorLoading } =
    useGetConsignorsQuery({
      variables: {
        pov: listPerspective,
      },
    });

  const statusOptions = useMemo<
    DropdownValueType<ContractStatus | SowStatus, ContractStatus | SowStatus>[]
  >(
    () =>
      documentType === DocumentType.Contract
        ? getAvailableContractStatuses(listPerspective).map((status) =>
            mapContractStatusToOption(status, t),
          )
        : getAvailableStatementOfWorkStatuses(listPerspective).map((status) =>
            mapSowStatusToOption(status, t),
          ),
    [documentType, listPerspective, t],
  );

  const consignorOptions = useMemo(
    () => cleanList(consignorsData?.getConsignors).map(mapConsignorToOption),
    [consignorsData?.getConsignors],
  );
  const noumOptions = useMemo(
    () =>
      cleanList(
        documentType === DocumentType.Contract
          ? contractNoums?.getNoumsLinkedToContracts
          : statementOfWorkNoums?.getNoumsLinkedToSOWs,
      ).map(mapNoumToOption),
    [
      contractNoums?.getNoumsLinkedToContracts,
      documentType,
      statementOfWorkNoums,
    ],
  );

  return {
    statuses: {
      options: statusOptions,
      allValues: useMemo(
        () => statusOptions.map((option) => option.key),
        [statusOptions],
      ),
      loading: false,
    },
    consignors: {
      options: consignorOptions,
      allValues: useMemo(
        () => consignorOptions.map((option) => option.key),
        [consignorOptions],
      ),
      loading: consignorLoading,
    },
    noums: {
      options: noumOptions,
      allValues: useMemo(
        () => noumOptions.map((option) => option.key),
        [noumOptions],
      ),
      loading: contractNoumsLoading || statementOfWorkNoumsLoading,
    },
  };
}
