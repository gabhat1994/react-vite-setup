import { type ApolloCache } from '@apollo/client';
import { useCallback } from 'react';
import {
  type ContractFragment,
  ContractFragmentDoc,
  GetSingleContractDocument,
  useRejectContractMutation,
  useSendContractForSigningMutation,
  useSignContractMutation,
} from '@/apollo/graphql';
import { ContractStatus } from '../types';

function updateContractStatusInCache(
  cache: ApolloCache<unknown>,
  contractId: string,
  newStatus: ContractStatus,
) {
  cache.updateFragment<ContractFragment>(
    {
      fragment: ContractFragmentDoc,
      fragmentName: 'Contract',
      id: cache.identify({
        __typename: 'Contract',
        _id: contractId,
      }),
    },
    (prevData) => {
      if (!prevData) {
        return null;
      }

      return {
        ...prevData,
        status: newStatus,
      };
    },
  );
}

interface UseContractSigningOptions {
  id: string | undefined;
}

export function useContractSigning({ id }: UseContractSigningOptions) {
  const [sendForSigningMutation] = useSendContractForSigningMutation({
    update(cache, result) {
      if (!result.data?.sendDocumentForSigning || !id) {
        return;
      }

      updateContractStatusInCache(cache, id, ContractStatus.Issued);
    },
    refetchQueries: [GetSingleContractDocument],
  });

  const [signMutation] = useSignContractMutation({
    update(cache, result) {
      if (!result.data?.signContract || !id) {
        return;
      }

      updateContractStatusInCache(cache, id, ContractStatus.Signed);
    },
    refetchQueries: [GetSingleContractDocument],
  });

  const [rejectMutation] = useRejectContractMutation({
    update(cache, result) {
      if (!result.data?.rejectContract || !id) {
        return;
      }

      updateContractStatusInCache(cache, id, ContractStatus.Draft);
    },
    refetchQueries: [GetSingleContractDocument],
  });

  const sendForSigning = useCallback(async () => {
    if (!id) {
      return;
    }

    const result = await sendForSigningMutation({ variables: { id } });
    if (!result.data?.sendDocumentForSigning) {
      throw new Error('Unable to send the document. Please try again later.');
    }
  }, [id, sendForSigningMutation]);

  const sign = useCallback(async () => {
    if (!id) {
      return;
    }

    const result = await signMutation({ variables: { id } });
    if (!result.data?.signContract) {
      throw new Error('Unable to sign the document. Please try again later.');
    }
  }, [id, signMutation]);

  const reject = useCallback(async () => {
    if (!id) {
      return;
    }

    const result = await rejectMutation({ variables: { id } });
    if (!result.data?.rejectContract) {
      throw new Error(
        'Unable to decline the document. Please try again later.',
      );
    }
  }, [id, rejectMutation]);

  return {
    sendForSigning,
    sign,
    reject,
  };
}
