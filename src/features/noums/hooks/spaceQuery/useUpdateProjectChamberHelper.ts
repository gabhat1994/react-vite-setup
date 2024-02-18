import { useCallback } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useToast } from '@/hooks';
import { useUpdateProjectChamberMutation } from '@/apollo/graphql';
import { type ProjectChamberUpdateInput } from '@/apollo/generated/types';

export function useUpdateProjectChamberHelper() {
  const { addToast } = useToast();

  const handleError = useCallback(
    (networkError: String | Error | null) => {
      addToast(
        'error',
        'none',
        `${t('noumena.toast_error.text')}: ${networkError}`,
      );
    },
    [addToast],
  );

  const handleSuccess = useCallback(() => {
    addToast(
      'success',
      'icon',
      `${t('noumena.toast_success.text')}: ${t(
        'noumena.noum_edit.noum_edit_success_message.text',
      )}`,
    );
  }, [addToast]);

  const [updateProjectChamber, { loading }] = useUpdateProjectChamberMutation();

  const updateProjectChamberHelper = useCallback(
    async (id: string, input: ProjectChamberUpdateInput, isToast?: boolean) => {
      let isSuccess;
      await updateProjectChamber({
        variables: { id, input },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          handleError(err?.message ?? networkError);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'updateProjectChamberMutation',
            },
          });
          isSuccess = false;
        },
        onCompleted: () => {
          if (!isToast) handleSuccess();
          isSuccess = true;
        },
      });
      return isSuccess;
    },
    [handleError, handleSuccess, updateProjectChamber],
  );

  return { loading, updateProjectChamberHelper };
}
