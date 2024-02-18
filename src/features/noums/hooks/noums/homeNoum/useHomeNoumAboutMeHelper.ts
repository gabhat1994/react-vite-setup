import { useCallback } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks/toast';
import {
  useUpdateUserProfileMutation,
  useUpdateUserProfilePictureMutation,
} from '@/apollo/graphql';
import {
  type InputMaybe,
  type UserProfileInput,
} from '@/apollo/generated/types';

export function useHomeNoumAboutMeHelper() {
  const { addToast } = useToast();
  const { refetchUserData } = useAuth();

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
      'none',
      `${t('noumena.toast_success.text')}: ${t(
        'noumena.home_noum.about_me.save_changes.success',
      )}`,
    );
    refetchUserData();
  }, [addToast, refetchUserData]);

  const [updateProfile, { loading: profileUpdateLoading }] =
    useUpdateUserProfileMutation();

  const [updateProfilePic, { loading: picUpdateLoading }] =
    useUpdateUserProfilePictureMutation();

  const loading = profileUpdateLoading || picUpdateLoading;

  const homeNoumAboutMeHelper = useCallback(
    async (input: UserProfileInput) => {
      const successObj = { success: false };
      await updateProfile({
        variables: { input },
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
          handleSuccess();
          successObj.success = true;
        },
      });
      return successObj;
    },
    [handleError, handleSuccess, updateProfile],
  );

  const homeNoumAboutMeProfilePicHelper = useCallback(
    async (profilePictureLink: InputMaybe<string> | undefined) => {
      const successObj = { profilePicSuccess: false };
      await updateProfilePic({
        variables: { profilePictureLink },
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
          successObj.profilePicSuccess = true;
        },
      });
      return successObj;
    },
    [handleError, updateProfilePic],
  );

  return { loading, homeNoumAboutMeHelper, homeNoumAboutMeProfilePicHelper };
}

export default useHomeNoumAboutMeHelper;
