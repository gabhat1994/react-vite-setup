import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import {
  GetSpaceByIdDocument,
  useUpdateNoumLayoutSectionMutation,
} from '@/apollo/graphql';
import { type UpdateNoumLayoutSectionInput } from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useUpdateNoumSectionHelper() {
  const { addToast } = useToast();
  const [updateSectionLayout, { loading }] =
    useUpdateNoumLayoutSectionMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const updateNoumSectionHelper = useCallback(
    async (spaceId: string, input: UpdateNoumLayoutSectionInput) => {
      try {
        await updateSectionLayout({
          variables: { input },
          update: (cache, { data }) => {
            if (!data || !data.updateNoumLayoutSection) return;

            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              spaceId,
              cache,
            );

            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: cloneSpaceData,
              },
            });
          },
        });
        return true;
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        addToast('error', 'none', message);
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'updateNoumLayoutSectionMutation',
          },
        });
      }

      return false;
    },
    [addToast, getSpaceCloneHelper, updateSectionLayout],
  );
  return {
    loading,
    updateNoumSectionHelper,
  };
}

export default useUpdateNoumSectionHelper;
