import { useCallback } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useToast } from '@/hooks/toast';
import { useUpdateConnectionPermissionMutation } from '@/apollo/graphql';
import { type ConnectionPermissionInput } from '@/apollo/generated/types';

export function useUpdateConnectionPermissionHelper() {
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
      `${t('noumena.chamber_edit.permission.save_success_message')}`,
    );
  }, [addToast]);

  const [updateConnectionPermission, { loading }] =
    useUpdateConnectionPermissionMutation();

  const updateConnectionPermissionHelper = useCallback(
    async (input: ConnectionPermissionInput) => {
      await updateConnectionPermission({
        variables: { input },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          handleError(err?.message ?? networkError);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'updateConnectionPermissionMutation',
            },
          });
        },
        onCompleted: () => {
          handleSuccess();
        },
      });
    },
    [updateConnectionPermission, handleError, handleSuccess],
  );

  return { loading, updateConnectionPermissionHelper };
}

export default useUpdateConnectionPermissionHelper;
