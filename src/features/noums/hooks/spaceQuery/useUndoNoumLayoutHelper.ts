import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import {
  GetSpaceByIdDocument,
  useUndoNoumLayoutChangeMutation,
} from '@/apollo/graphql';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useUndoNoumLayoutHelper() {
  const [undoNoumLayout, { loading }] = useUndoNoumLayoutChangeMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const undoNoumLayoutChangeHelper = useCallback(
    async (spaceId: string) => {
      let result;
      try {
        await undoNoumLayout({
          variables: {
            noumId: spaceId,
          },
          update: (cache, { data }) => {
            if (!data || !data.undoNoumLayoutChange) return;

            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              spaceId,
              cache,
            );
            if (!cloneSpaceData?.layout) return;

            cloneSpaceData.layout = data.undoNoumLayoutChange;
            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: cloneSpaceData,
              },
            });
            result = data.undoNoumLayoutChange;
          },
        });
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }

        Sentry.captureException(new Error(message), {
          tags: {
            section: 'undoNoumLayoutChangeHelperMutation',
          },
        });
      }

      return result;
    },
    [getSpaceCloneHelper, undoNoumLayout],
  );

  return {
    loading,
    undoNoumLayoutChangeHelper,
  };
}
