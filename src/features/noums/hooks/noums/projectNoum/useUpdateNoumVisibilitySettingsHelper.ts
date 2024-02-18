import { useCallback } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useToast } from '@/hooks/toast';
import { type ProjectChamberType } from '@/apollo/generated/types';
import { useUpdateNoumVisibilitySettingsMutation } from '@/apollo/graphql';

export function useUpdateNoumVisibilitySettingsHelper() {
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

  const [updateNoumVisibilitySettings, { loading }] =
    useUpdateNoumVisibilitySettingsMutation();

  const updateNoumVisibilitySettingsHelper = useCallback(
    async (spaceId: string, visibility: ProjectChamberType) => {
      await updateNoumVisibilitySettings({
        variables: { spaceId, visibility },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          handleError(err?.message ?? networkError);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'updateNoumVisibilitySettingsMutation',
            },
          });
        },
      });
    },
    [handleError, updateNoumVisibilitySettings],
  );

  return { loading, updateNoumVisibilitySettingsHelper };
}

export default useUpdateNoumVisibilitySettingsHelper;
