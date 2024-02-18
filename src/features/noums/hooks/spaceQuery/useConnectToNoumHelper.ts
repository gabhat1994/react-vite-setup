import { useCallback } from 'react';
import {
  // GetSpaceForViewDocument,
  useConnectToNoumMutation,
} from '@/apollo/graphql';
import { useError } from '@/hooks';
// import { NoumLayoutStatusFilter } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
// import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useConnectToNoumHelper() {
  const { logError } = useError();
  const { masterId } = useAuth();

  const [connectToNoum, { loading }] = useConnectToNoumMutation();
  // const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const connectToNoumHelper = useCallback(
    async (noumId: string) => {
      try {
        await connectToNoum({
          variables: { noumId, userHomeNoumId: masterId },
          // update: (cache, { data }) => {
          //   if (!data || !data.connectToNoum) return;

          //   const { cloneSpaceData, variables } = getSpaceCloneHelper(
          //     noumId,
          //     cache,
          //     NoumLayoutStatusFilter.Published,
          //     masterId,
          //   );

          //   if (!cloneSpaceData) return;

          //   cache.writeQuery({
          //     query: GetSpaceForViewDocument,
          //     variables,
          //     data: {
          //       getSpaceById: {
          //         ...cloneSpaceData,
          //         membershipStatus: data.connectToNoum.membershipStatus,
          //       },
          //     },
          //   });
          // },
        });

        return true;
      } catch (error) {
        logError(error, 'connectToNoum');
        return false;
      }
    },
    [connectToNoum, logError, masterId],
  );

  return {
    loading,
    connectToNoumHelper,
  };
}

export default useConnectToNoumHelper;
