import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import {
  GetSpaceByIdDocument,
  useRemovedPrevStateMutation,
} from '@/apollo/graphql';
import {
  ElementStatusEnumForStateChange,
  NoumLayoutStatusFilter,
} from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useDiscardSpaceChangeHelper() {
  const { addToast } = useToast();

  const [removedPrevState, { loading }] = useRemovedPrevStateMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const discardSpaceChangeHelper = useCallback(
    async (noumId: string, isToast = true) => {
      let isSuccess;
      try {
        await removedPrevState({
          variables: {
            noumId,
            state: ElementStatusEnumForStateChange.Unsaved,
          },
          update: (cache, { data }) => {
            if (!data || !data.removedPrevState) return;
            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              noumId,
              cache,
              NoumLayoutStatusFilter.Unpublished,
            );
            if (!cloneSpaceData?.layout) return;
            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: {
                  ...cloneSpaceData,
                  ...data?.removedPrevState,
                },
              },
            });
          },
        });
        if (isToast) {
          addToast(
            'success',
            'none',
            t(`noumena.container.chamber_discard_change.success`),
          );
        }
        isSuccess = true;
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        addToast('error', 'none', message);
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'removedPrevStateMutation',
          },
        });
        isSuccess = false;
      }

      return isSuccess;
    },
    [addToast, getSpaceCloneHelper, removedPrevState],
  );

  return {
    loading,
    discardSpaceChangeHelper,
  };
}

export default useDiscardSpaceChangeHelper;
