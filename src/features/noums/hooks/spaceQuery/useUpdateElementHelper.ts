import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { type ElementInput } from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';
import {
  GetSpaceByIdDocument,
  useUpdateElementMutation,
} from '@/apollo/graphql';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useUpdateElementHelper() {
  const { addToast } = useToast();

  const [updateElement, { loading }] = useUpdateElementMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const updateElementHelper = useCallback(
    async (spaceId: string, input: ElementInput | ElementInput[]) => {
      let isSuccess = false;

      if (!spaceId) {
        addToast('error', 'none', 'SpaceId required');
      }
      try {
        await updateElement({
          variables: { id: spaceId, input, editorV2Enabled: true },
          update: (cache, { data }) => {
            if (!data || !data.updateElement) return;

            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              spaceId,
              cache,
            );
            if (!cloneSpaceData || !cloneSpaceData?.layout) return;

            if (data?.updateElement?.layout)
              cloneSpaceData.layout = data?.updateElement?.layout;
            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: cloneSpaceData,
              },
            });
          },
          onCompleted: () => {
            isSuccess = true;
          },
        });
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        addToast('error', 'none', message);
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'removeElementMutation',
          },
        });
      }

      return isSuccess;
    },
    [addToast, getSpaceCloneHelper, updateElement],
  );

  return {
    loading,
    updateElementHelper,
  };
}

export default useUpdateElementHelper;
