import { useCallback } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useToast } from '@/hooks/toast';
import {
  useChangeProjectChamberStatusMutation,
  useUpdateChamberProjectTypeMutation,
} from '@/apollo/graphql';
import {
  type ProjectChamberType,
  SpaceStatusEnum,
} from '@/apollo/generated/types';

export function useUpdateChamberProjectTypeHelper() {
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
      `${t('noumena.chamber_edit.visibility.success_message')}`,
    );
  }, [addToast]);

  const [updateChamberProjectType, { loading }] =
    useUpdateChamberProjectTypeMutation();
  const [changeProjectChamberStatus, { loading: isLoading }] =
    useChangeProjectChamberStatusMutation();

  const updateChamberProjectTypeHelper = useCallback(
    async (id: string, projectType: ProjectChamberType) => {
      await updateChamberProjectType({
        variables: { id, projectType },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          handleError(err?.message ?? networkError);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'updateProjectChamberMutation',
            },
          });
        },
      });
      await changeProjectChamberStatus({
        variables: { spaceId: id, status: SpaceStatusEnum.Draft },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          handleError(err?.message ?? networkError);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'changeProjectChamberStatusMutation',
            },
          });
        },
        onCompleted: () => {
          handleSuccess();
        },
      });
    },
    [
      handleError,
      handleSuccess,
      updateChamberProjectType,
      changeProjectChamberStatus,
    ],
  );

  return { loading: loading || isLoading, updateChamberProjectTypeHelper };
}
