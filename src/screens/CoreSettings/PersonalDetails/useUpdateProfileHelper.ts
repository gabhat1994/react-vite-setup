import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';
import { useUpdateUserProfileMutation } from '@/apollo/graphql';

export const useUpdateProfileHelper = () => {
  const [updateProfile] = useUpdateUserProfileMutation();
  const { addToast } = useToast();
  const { refetchUserData } = useAuth();
  const handleError = useCallback(
    (networkError: string | Error | null) => {
      addToast(
        'error',
        'icon',
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
        'noumena.save_changes.success',
      )}`,
    );
  }, [addToast]);

  const handleSave = useCallback(
    async (userProfileDetails) => {
      const successObj = { success: false };
      await updateProfile({
        variables: {
          input: userProfileDetails,
        },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          handleError(err?.message ?? networkError);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'useUpdateUserProfileMutation',
            },
          });
        },
        onCompleted: () => {
          refetchUserData();
          handleSuccess();
          successObj.success = true;
        },
      });
      return successObj.success;
    },
    [updateProfile, handleError, refetchUserData, handleSuccess],
  );

  return { handleSave, handleError };
};
