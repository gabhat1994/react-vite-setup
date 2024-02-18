import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import {
  NoumLayoutStatusFilter,
  type ElementStatusEnum,
} from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';
import {
  GetSpaceByIdDocument,
  GetSpaceForViewDocument,
  usePublishElementStateMutation,
} from '@/apollo/graphql';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function usePublishElementStateHelper() {
  const { addToast } = useToast();

  const [publishElementState, { loading }] = usePublishElementStateMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const publishElementStateHelper = useCallback(
    async (
      spaceId: string,
      prevStates: ElementStatusEnum | ElementStatusEnum[],
      currentState: ElementStatusEnum,
      elementIds?: string[],
    ) => {
      try {
        if (spaceId) {
          return await publishElementState({
            variables: {
              noumId: spaceId,
              prevStates,
              currentState,
              editorV2Enabled: true,
              elementIds,
            },
            update: (cache, { data }) => {
              if (!data || !data.publishElementState) return;

              const noumLayoutStatus =
                elementIds && elementIds?.length > 0
                  ? NoumLayoutStatusFilter.Published
                  : NoumLayoutStatusFilter.Unpublished;

              const { cloneSpaceData, variables } = getSpaceCloneHelper(
                spaceId,
                cache,
                noumLayoutStatus,
              );

              if (cloneSpaceData?.layout && data.publishElementState.layout) {
                cloneSpaceData.layout = data.publishElementState.layout;
              }

              if (
                cloneSpaceData?.elements &&
                data.publishElementState.elements
              ) {
                cloneSpaceData.elements = data.publishElementState.elements;
              }

              cache.writeQuery({
                query:
                  noumLayoutStatus === NoumLayoutStatusFilter.Published
                    ? GetSpaceForViewDocument
                    : GetSpaceByIdDocument,
                variables,
                data: {
                  getSpaceById: cloneSpaceData,
                },
              });
            },
          });
        }
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
      return undefined;
    },
    [addToast, getSpaceCloneHelper, publishElementState],
  );

  return {
    loading,
    publishElementStateHelper,
  };
}

export default usePublishElementStateHelper;
