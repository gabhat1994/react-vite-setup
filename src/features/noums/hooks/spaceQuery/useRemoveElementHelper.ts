import {
  GetSpaceByIdDocument,
  type GetSpaceByIdQueryVariables,
  useRemoveElementMutation,
} from '@/apollo/graphql';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useCallback } from 'react';
import { useToast } from '@/hooks/toast';
import { NoumLayoutStatusFilter } from '@/apollo/generated/types';

export function useRemoveElementHelper() {
  const { addToast } = useToast();

  const [removeElement, { loading }] = useRemoveElementMutation();

  const removeElementHelper = useCallback(
    async (noumId: string, elementId: string) => {
      let isSuccess;
      try {
        await removeElement({
          variables: { noumId, elementId, editorV2Enabled: false },
          update: async (cache, { data }) => {
            if (!data || !data.removeElement) return;

            const variables: GetSpaceByIdQueryVariables = {
              noumId,
              editorV2Enabled: false,
              status: NoumLayoutStatusFilter.Unpublished,
            };

            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: {
                  ...data.removeElement,
                  category: data.removeElement.category,
                },
              },
            });
          },
        });

        addToast(
          'success',
          'none',
          t(`noumena.container.element_delete.success`),
        );

        isSuccess = true;
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

        isSuccess = false;
      }

      return isSuccess;
    },
    [addToast, removeElement],
  );

  return {
    loading,
    removeElementHelper,
  };
}

export default useRemoveElementHelper;
