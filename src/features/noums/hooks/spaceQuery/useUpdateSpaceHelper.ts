import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useUpdateSpaceMutation } from '@/apollo/graphql';
import { type SpaceUpdateInput } from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';

export function useUpdateSpaceHelper() {
  const { addToast } = useToast();

  const [updateSpace, { loading }] = useUpdateSpaceMutation();

  const updateSpaceHelper = useCallback(
    async (id: string, input: SpaceUpdateInput) => {
      let isSuccess;
      try {
        await updateSpace({
          variables: { id, input },
        });
        addToast(
          'success',
          'icon',
          `${t('noumena.toast_success.text')}: ${t(
            'noumena.noum_edit.noum_edit_success_message.text',
          )}`,
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
            section: 'updateSpaceMutation',
          },
        });

        isSuccess = false;
      }

      return isSuccess;
    },
    [addToast, updateSpace],
  );

  return {
    loading,
    updateSpaceHelper,
  };
}
