import { useCallback } from 'react';
import {
  GetSpaceForViewDocument,
  useCancelConnectionRequestToNoumMutation,
} from '@/apollo/graphql';
import { useError } from '@/hooks';

export function useCancelConnectionRequestToNoumHelper() {
  const { logError } = useError();

  const [cancelConnectionRequestToNoum, { loading }] =
    useCancelConnectionRequestToNoumMutation();

  const cancelConnectionRequestToNoumHelper = useCallback(
    async (noumId: string) => {
      try {
        await cancelConnectionRequestToNoum({
          variables: { noumId },
          awaitRefetchQueries: true,
          refetchQueries: [GetSpaceForViewDocument],
        });

        return true;
      } catch (error) {
        logError(error, 'cancelConnectionRequestToNoum');
        return false;
      }
    },
    [cancelConnectionRequestToNoum, logError],
  );

  return {
    loading,
    cancelConnectionRequestToNoumHelper,
  };
}

export default useCancelConnectionRequestToNoumHelper;
