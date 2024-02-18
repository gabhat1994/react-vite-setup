import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useUpdateNoumApplicationResultMutation } from '@/apollo/graphql';
import { type ApplicationResultInput } from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';

export function useUpdateNoumApplicationResultHelper() {
  const { addToast } = useToast();

  const [updateNoumApplicationResult] =
    useUpdateNoumApplicationResultMutation();

  const updateNoumApplicationNoumHelper = useCallback(
    async (_id: string, input: ApplicationResultInput) => {
      let isSuccess = false;
      await updateNoumApplicationResult({
        variables: { _id, input },
        onCompleted: (data) => {
          if (data.updateNoumApplicationResult?._id) {
            isSuccess = true;
            addToast(
              'success',
              'none',
              t(`noumena.riseprogram.rise_essay_answer_saved`),
            );
          }
        },
        onError: (error) => {
          if (error instanceof Error) {
            addToast('error', 'none', error.message);
            Sentry.captureException(new Error(error.message), {
              tags: {
                section: 'updateNoumApplicationResult',
              },
            });
          }
        },
      });

      return isSuccess;
    },
    [addToast, updateNoumApplicationResult],
  );

  return {
    updateNoumApplicationNoumHelper,
  };
}

export default useUpdateNoumApplicationResultHelper;
