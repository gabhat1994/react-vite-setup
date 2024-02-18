import { useApolloClient } from '@apollo/client';
import { difference } from 'lodash';
import { useCallback, useMemo } from 'react';
import {
  GetLinkedSoWsDocument,
  GetUnlinkedSoWsDocument,
  useGetLinkedSoWsQuery,
  useGetUnlinkedSoWsQuery,
  useHandleSowLinkingMutation,
} from '@/apollo/graphql';
import { type DraftContractFormValues } from '@/features/contracts/hooks/contractForm';
import { cleanList } from '@/utils/list';

interface UseLinkedStatementsOfWorkOptions {
  contractId: string | undefined;
  noumId: string | undefined;
}

export function useLinkedStatementsOfWork({
  contractId,
  noumId,
}: UseLinkedStatementsOfWorkOptions) {
  const apolloClient = useApolloClient();

  const [handleSowLinking] = useHandleSowLinkingMutation();

  const linkedSowsQuery = useGetLinkedSoWsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: {
      contractId: contractId!,
    },
    skip: !contractId,
  });

  const unlinkedSowsQuery = useGetUnlinkedSoWsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: {
      noumId: noumId!,
    },
    skip: !contractId || !noumId,
  });

  const linkedSows = useMemo(
    () => cleanList(linkedSowsQuery.data?.getLinkedSOWs.data),
    [linkedSowsQuery.data?.getLinkedSOWs.data],
  );

  const unlinkedSows = useMemo(
    () => cleanList(unlinkedSowsQuery.data?.getAllSOW.data),
    [unlinkedSowsQuery.data?.getAllSOW.data],
  );

  const linkSow = useCallback(
    async (statementOfWorkId: string) => {
      if (!contractId) {
        return;
      }
      await handleSowLinking({
        variables: {
          contractId,
          sowId: statementOfWorkId,
          link: true,
        },
      });
    },
    [handleSowLinking, contractId],
  );

  const unlinkSow = useCallback(
    async (statementOfWorkId: string) => {
      if (!contractId) {
        return;
      }
      await handleSowLinking({
        variables: {
          contractId,
          sowId: statementOfWorkId,
          link: false,
        },
      });
    },
    [handleSowLinking, contractId],
  );

  const synchronizeLinkedSows = async (values: DraftContractFormValues) => {
    const existingLinkedSowIds = linkedSows.map((item) => item._id);
    const formLinkedSowIds = cleanList(
      values.linkedStatementsOfWork?.map((item) => item?.statementOfWorkId),
    );

    const addedSowIds = difference(formLinkedSowIds, existingLinkedSowIds);
    const removedSowIds = difference(existingLinkedSowIds, formLinkedSowIds);

    await Promise.all([
      ...addedSowIds.map(linkSow),
      ...removedSowIds.map(unlinkSow),
    ]);

    if (addedSowIds.length > 0 || removedSowIds.length > 0) {
      apolloClient.refetchQueries({
        include: [GetLinkedSoWsDocument, GetUnlinkedSoWsDocument],
      });
    }
  };

  return {
    linkedSows: {
      data: linkedSows,
      loading: linkedSowsQuery.loading,
    },
    unlinkedSows: {
      data: unlinkedSows,
      loading: unlinkedSowsQuery.loading,
    },
    synchronizeLinkedSows,
  };
}
