import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ContractToolRoutes } from '@/features/contracts/utils/routes';

import {
  ContractListingPov,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useContractPermissions } from '@/features/contracts/hooks/contractPermissions';
import { useStatementOfWorkPermissions } from '@/features/contracts/hooks/statementOfWorkPermissions';
import {
  type ContractBasic,
  DocumentType,
  type StatementOfWorkBasic,
} from '@/features/contracts/types';
import { useNavigateWithOrigin } from '@/hooks/navigation';
import {
  type GetContractsQuery,
  type GetStatementsOfWorkQuery,
  useGetContractsQuery,
  useGetStatementsOfWorkQuery,
} from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import {
  NoumDocumentStatus,
  type Filters,
  type ContractManagerProp,
  type InfiniteState,
} from './types';
import { ContractElementMapper } from './utils/contractElementMapper';

export const useContractsElement = ({
  isOwner,
  spaceId,
  ROWS_PER_PAGE = 5,
}: ContractManagerProp) => {
  const { hasElementPermission } = useNoumAuthorization();

  const isOwnerPerspective = hasElementPermission(
    PermissibleElementType.ContractTool,
    'view-owned-contracts-sows',
    isOwner,
  );
  const listPerspective = isOwnerPerspective
    ? ContractListingPov.Owner
    : ContractListingPov.CounterParty;

  const navigate = useNavigate();
  const { navigateAndSetOrigin } = useNavigateWithOrigin();
  const [isCollapse, setIsCollapse] = useState(true);
  const [contracts, setContracts] =
    useState<GetContractsQuery['getContractList']['data']>();
  const [statementsOfWork, setStatementsOfWork] =
    useState<GetStatementsOfWorkQuery['getAllSOW']['data']>();
  const [sowInfiniteState, setSowInfiniteState] =
    useState<InfiniteState>('hasNextPage');
  const [contractInfiniteState, setContractInfiniteState] =
    useState<InfiniteState>('hasNextPage');

  const [filters, setFilters] = useState<Filters>({
    type: DocumentType.Contract,
    status: NoumDocumentStatus.All,
    listPerspective,
  });

  const ContractPermissions = useContractPermissions();
  const StatementOfWorkPermissions = useStatementOfWorkPermissions();

  const {
    data: contractsData,
    loading: contractsLoading,
    fetchMore: contractsFetchMore,
  } = useGetContractsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      viewingAs: listPerspective,
      filter: ContractElementMapper.toContractsList(spaceId, filters),
      limit: ROWS_PER_PAGE,
      offset: 0,
    },
    skip: !spaceId,
    onCompleted(data) {
      if (
        data.getContractList?.data &&
        data.getContractList.data.length < ROWS_PER_PAGE
      ) {
        setContractInfiniteState('end');
      }
    },
  });

  const {
    data: sowData,
    loading: sowLoading,
    fetchMore: sowFetchMore,
  } = useGetStatementsOfWorkQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      viewingAs: listPerspective,
      filter: ContractElementMapper.toStatementsOfWorkList(spaceId, filters),
      limit: ROWS_PER_PAGE,
      offset: 0,
    },
    skip: !spaceId,
    onCompleted(data) {
      if (data.getAllSOW?.data && data.getAllSOW.data.length < ROWS_PER_PAGE) {
        setSowInfiniteState('end');
      }
    },
  });

  useEffect(() => {
    setContracts(cleanList(contractsData?.getContractList.data));
  }, [contractsData?.getContractList.data]);

  useEffect(() => {
    setStatementsOfWork(cleanList(sowData?.getAllSOW.data));
  }, [sowData?.getAllSOW.data]);

  const fetchMoreContacts = useCallback(async () => {
    const result = await contractsFetchMore({
      variables: {
        limit: ROWS_PER_PAGE,
        offset: contracts?.length || 0,
      },
    });
    const data = result.data.getContractList.data || [];
    if ((data.length || 0) < ROWS_PER_PAGE) setContractInfiniteState('end');
    const mergeData = [...(contracts || []), ...data];
    setContracts(cleanList(mergeData));
  }, [ROWS_PER_PAGE, contracts, contractsFetchMore]);

  const fetchMoreSow = useCallback(async () => {
    const result = await sowFetchMore({
      variables: {
        limit: ROWS_PER_PAGE,
        offset: statementsOfWork?.length || 0,
      },
    });
    const data = result.data.getAllSOW.data || [];
    if ((data.length || 0) < ROWS_PER_PAGE) setSowInfiniteState('end');
    const mergeData = [...(statementsOfWork || []), ...data];
    setStatementsOfWork(cleanList(mergeData));
  }, [ROWS_PER_PAGE, sowFetchMore, statementsOfWork]);

  const onFetchMore =
    filters.type === DocumentType.Contract ? fetchMoreContacts : fetchMoreSow;
  const infiniteState =
    filters.type === DocumentType.Contract
      ? contractInfiniteState
      : sowInfiniteState;

  const isLoading = sowLoading || contractsLoading;

  const hasNoDocuments =
    filters.status === NoumDocumentStatus.All &&
    !isLoading &&
    contracts?.length === 0 &&
    statementsOfWork?.length === 0;

  const value = useMemo(
    () => ({
      filters,
      contracts,
      setFilters,
      isCollapse,
      setIsCollapse,
      hasNoDocuments,
      statementsOfWork,
      onFetchMore,
      infiniteState,
      isLoading,
      listPerspective,
      handleNewContract: () => {
        navigateAndSetOrigin(
          ContractToolRoutes.createContract({ noumId: spaceId }),
        );
      },
      handleNewStatementOfWork: () => {
        navigateAndSetOrigin(
          ContractToolRoutes.createStatementOfWork({ noumId: spaceId }),
        );
      },
      handleNavigateToContract: (item: ContractBasic) => {
        if (listPerspective === ContractListingPov.CounterParty) {
          navigateAndSetOrigin(
            ContractToolRoutes.viewContract({ id: item._id }),
          );
          return;
        }

        navigateAndSetOrigin(
          ContractPermissions.canEdit(item) &&
            hasElementPermission(
              PermissibleElementType.ContractTool,
              'edit-contract-sow',
              true,
            )
            ? ContractToolRoutes.editContract({ id: item._id })
            : ContractToolRoutes.viewContract({ id: item._id }),
        );
      },
      handleNavigateToStatementOfWork: (item: StatementOfWorkBasic) => {
        if (listPerspective === ContractListingPov.CounterParty) {
          navigateAndSetOrigin(
            ContractToolRoutes.viewStatementOfWork({ id: item._id }),
          );
          return;
        }

        navigateAndSetOrigin(
          StatementOfWorkPermissions.canEdit(item) &&
            hasElementPermission(
              PermissibleElementType.ContractTool,
              'edit-contract-sow',
              true,
            )
            ? ContractToolRoutes.editStatementOfWork({ id: item._id })
            : ContractToolRoutes.viewStatementOfWork({ id: item._id }),
        );
      },
      handleNavigateToContractManager: () => {
        const status =
          filters.type === DocumentType.Contract
            ? ContractElementMapper.mapNoumDocumentStatusToContractStatus(
                filters.status,
              )
            : ContractElementMapper.mapNoumDocumentStatusToSowStatus(
                filters.status,
              );

        navigate(
          ContractToolRoutes.contractManager({
            noumId: spaceId,
            type: filters.type,
            perspective: listPerspective,
            status: status ?? undefined,
          }),
        );
      },
    }),
    [
      filters,
      contracts,
      isCollapse,
      hasNoDocuments,
      statementsOfWork,
      onFetchMore,
      infiniteState,
      isLoading,
      listPerspective,
      navigateAndSetOrigin,
      spaceId,
      ContractPermissions,
      hasElementPermission,
      StatementOfWorkPermissions,
      navigate,
    ],
  );
  return value;
};
