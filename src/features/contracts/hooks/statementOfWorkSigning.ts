import { type ApolloCache } from '@apollo/client';
import { useCallback } from 'react';
import {
  GetSingleSowDocument,
  type SowFragment,
  SowFragmentDoc,
  useRejectStatementOfWorkMutation,
  useSendSowForSigningMutation,
  useSignStatementOfWorkMutation,
} from '@/apollo/graphql';
import { StatementOfWorkStatus } from '../types';

function updateStatementOfWorkStatusInCache(
  cache: ApolloCache<unknown>,
  statementOfWorkId: string,
  newStatus: StatementOfWorkStatus,
) {
  cache.updateFragment<SowFragment>(
    {
      fragment: SowFragmentDoc,
      fragmentName: 'SOW',
      id: cache.identify({
        __typename: 'SOW',
        _id: statementOfWorkId,
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

interface UseStatementOfWorkSigningOptions {
  id: string | undefined;
}

export function useStatementOfWorkSigning({
  id,
}: UseStatementOfWorkSigningOptions) {
  const [sendForSigningMutation] = useSendSowForSigningMutation({
    update(cache, result) {
      if (!result.data?.sendDocumentForSigning || !id) {
        return;
      }

      updateStatementOfWorkStatusInCache(
        cache,
        id,
        StatementOfWorkStatus.Issued,
      );
    },
    refetchQueries: [GetSingleSowDocument],
  });

  const [signMutation] = useSignStatementOfWorkMutation({
    update(cache, result) {
      if (!result.data?.signSow || !id) {
        return;
      }

      updateStatementOfWorkStatusInCache(
        cache,
        id,
        StatementOfWorkStatus.Signed,
      );
    },
    refetchQueries: [GetSingleSowDocument],
  });

  const [rejectMutation] = useRejectStatementOfWorkMutation({
    update(cache, result) {
      if (!result.data?.rejectSow || !id) {
        return;
      }

      updateStatementOfWorkStatusInCache(
        cache,
        id,
        StatementOfWorkStatus.Draft,
      );
    },
    refetchQueries: [GetSingleSowDocument],
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
    if (!result.data?.signSow) {
      throw new Error('Unable to sign the document. Please try again later.');
    }
  }, [id, signMutation]);

  const reject = useCallback(async () => {
    if (!id) {
      return;
    }

    const result = await rejectMutation({ variables: { id } });
    if (!result.data?.rejectSow) {
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
