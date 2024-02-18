import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useRemoveUnsavedAndDraftedDataMutation } from '@/apollo/graphql';
import { useToast } from '@/hooks/toast';
import { getTimeStampForDisplaying } from '@/utils/getTimeStampForDisplaying';

export function useRestoreSpaceHelper() {
  const { addToast } = useToast();

  const [removeUnsavedAndDraftedDataMutation, { loading }] =
    useRemoveUnsavedAndDraftedDataMutation();

  const restoreSpaceHelper = useCallback(
    async (spaceId: string) => {
      let isSuccess;
      try {
        const { data } = await removeUnsavedAndDraftedDataMutation({
          variables: {
            spaceId,
          },
        });
        addToast(
          'success',
          'icon',
          t(`noumena.container.chamber.restore.success`, {
            date: getTimeStampForDisplaying(
              data?.removeUnsavedAndDraftedData?.publishedAt,
            ),
          }),
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
            section: 'removeUnsavedAndDraftedDataMutation',
          },
        });
        isSuccess = false;
      }

      return isSuccess;
    },
    [addToast, removeUnsavedAndDraftedDataMutation],
  );

  return {
    loading,
    restoreSpaceHelper,
  };
}

export default useRestoreSpaceHelper;
