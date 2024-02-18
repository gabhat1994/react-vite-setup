import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import {
  GetSpaceByIdDocument,
  useRedoNoumLayoutChangeMutation,
} from '@/apollo/graphql';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useRedoNoumLayoutHelper() {
  const [redoNoumLayout, { loading }] = useRedoNoumLayoutChangeMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const redoNoumLayoutChangeHelper = useCallback(
    (spaceId: string) => {
      let result;
      try {
        redoNoumLayout({
          variables: {
            noumId: spaceId,
          },
          update: (cache, { data }) => {
            if (!data || !data.redoNoumLayoutChange) return;

            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              spaceId,
              cache,
            );
            if (!cloneSpaceData?.layout) return;

            cloneSpaceData.layout = data.redoNoumLayoutChange;
            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: cloneSpaceData,
              },
            });
            result = data.redoNoumLayoutChange;
          },
        });
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }

        Sentry.captureException(new Error(message), {
          tags: {
            section: 'redoNoumLayoutChangeHelperMutation',
          },
        });
        return error;
      }
      return result;
    },
    [getSpaceCloneHelper, redoNoumLayout],
  );

  return {
    loading,
    redoNoumLayoutChangeHelper,
  };
}
