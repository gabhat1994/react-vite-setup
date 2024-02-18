import { useCallback } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useToast } from '@/hooks/toast';
import {
  GetSpaceByIdDocument,
  GetSpaceForViewDocument,
  useChangeProjectChamberStatusMutation,
} from '@/apollo/graphql';
import {
  NoumLayoutStatusFilter,
  type SpaceStatusEnum,
} from '@/apollo/generated/types';
import { useUpdateCacheSpaceHelper } from '@/features/noums/hooks/spaceQuery';

export function useChangeProjectChamberStatusHelper() {
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
      'none',
      `${t('noumena.toast_success.text')}: ${t(
        'noumena.chamber_change_status.success_message',
      )}`,
    );
  }, [addToast]);

  const [changeProjectChamberStatus, { loading }] =
    useChangeProjectChamberStatusMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const changeProjectChamberStatusHelper = useCallback(
    async (spaceId: string, status: SpaceStatusEnum, onSuccess?: Function) => {
      await changeProjectChamberStatus({
        variables: { spaceId, status },
        awaitRefetchQueries: true,
        refetchQueries: [GetSpaceForViewDocument, GetSpaceByIdDocument],
        update: (cache, { data }) => {
          if (!data || !data.changeProjectChamberStatus) return;
          const { cloneSpaceData, variables } = getSpaceCloneHelper(
            spaceId,
            cache,
            NoumLayoutStatusFilter.Published,
          );
          cache.writeQuery({
            query: GetSpaceForViewDocument,
            variables,
            data: {
              getSpaceById: {
                ...cloneSpaceData,
                ...data?.changeProjectChamberStatus,
              },
            },
          });
        },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          handleError(err?.message ?? networkError);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'createProjectChamberMutation',
            },
          });
        },
        onCompleted: () => {
          handleSuccess();
          if (onSuccess) onSuccess();
        },
      });
    },
    [
      changeProjectChamberStatus,
      getSpaceCloneHelper,
      handleError,
      handleSuccess,
    ],
  );

  return { loading, changeProjectChamberStatusHelper };
}

export default useChangeProjectChamberStatusHelper;
