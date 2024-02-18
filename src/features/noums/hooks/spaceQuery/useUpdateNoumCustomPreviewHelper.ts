import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import {
  GetSpaceByIdDocument,
  useUpdateNoumCustomPreviewMutation,
} from '@/apollo/graphql';
import { type NoumCustomPreviewElementInput } from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useUpdateNoumCustomPreviewHelper() {
  const { addToast } = useToast();

  const [updateNoumCustomPreviewMutation, { loading }] =
    useUpdateNoumCustomPreviewMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();
  const updateNoumCustomPreviewHelper = useCallback(
    async (noumId: string, elements: NoumCustomPreviewElementInput[]) => {
      let isSuccess;
      try {
        await updateNoumCustomPreviewMutation({
          variables: { noumId, elements, editorV2Enabled: true },
          update: (cache, { data }) => {
            if (!data || !data.updateNoumCustomPreview) return;
            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              noumId,
              cache,
            );

            if (
              cloneSpaceData?.layout &&
              data?.updateNoumCustomPreview.layout
            ) {
              cloneSpaceData.layout = data.updateNoumCustomPreview.layout;
            }

            if (
              cloneSpaceData?.elements &&
              data.updateNoumCustomPreview.elements
            ) {
              cloneSpaceData.elements = data.updateNoumCustomPreview.elements;
            }

            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: cloneSpaceData,
              },
            });
          },
        });
        isSuccess = true;
        addToast(
          'success',
          'icon',
          t(`noumena.noum_edit.custom_preview.toast.save_success`),
        );
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        addToast('error', 'none', message);
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'updateNoumCustomPreviewMutation',
          },
        });

        isSuccess = false;
      }

      return isSuccess;
    },
    [addToast, getSpaceCloneHelper, updateNoumCustomPreviewMutation],
  );

  return {
    loading,
    updateNoumCustomPreviewHelper,
  };
}

export default useUpdateNoumCustomPreviewHelper;
