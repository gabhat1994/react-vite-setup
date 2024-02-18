import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import {
  ApolloError,
  type InternalRefetchQueriesInclude,
} from '@apollo/client';
import {
  GetSpaceConnectionsV2Document,
  useUpdateConnectionStatusMutation,
} from '@/apollo/graphql';
import {
  type ConnectionRequestTypeEnum,
  type Maybe,
} from '@/apollo/generated/types';
import { type ExceptionType } from '@/common/types';
import { useToast } from '@/hooks/toast';
import { updateUserNoumConnectionFragment } from '../../utils/userNoumConnectionCache';

type UpdateConnectionStatusHelperOptions = {
  spaceId: string;
  connectionId: Maybe<string> | undefined;
  status: ConnectionRequestTypeEnum;
  refetchQueries?: InternalRefetchQueriesInclude;
};

export function useUpdateConnectionStatusHelper() {
  const { addToast } = useToast();

  const [updateConnectionStatus, { loading }] =
    useUpdateConnectionStatusMutation();

  const updateConnectionStatusHelper = useCallback(
    async ({
      spaceId,
      connectionId,
      status,
    }: UpdateConnectionStatusHelperOptions) => {
      if (!connectionId || !spaceId) return false;

      try {
        await updateConnectionStatus({
          variables: { connectionId, status },
          refetchQueries: [GetSpaceConnectionsV2Document],
          update: (cache, { data }) => {
            if (!data || !data.updateConnectionStatus) return;

            updateUserNoumConnectionFragment({
              cache,
              noumId: spaceId,
              data: {
                connectionId: data.updateConnectionStatus._id,
                connectionWithNoum: data.updateConnectionStatus,
                connectionRole: data.updateConnectionStatus.permission,
              },
            });
          },
        });
        return true;
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof ApolloError) {
          const exception: ExceptionType = error.graphQLErrors[0].extensions
            ?.exception as ExceptionType;
          message =
            exception?.name === 'BussinesRuleValidationError'
              ? t(`noumena.chamber_invite_sent.error_non_exist_message`)
              : error.message;
        }
        addToast('error', 'none', message);
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'updateConnectionStatus',
          },
        });
        return false;
      }
    },
    [addToast, updateConnectionStatus],
  );

  return {
    loading,
    updateConnectionStatusHelper,
  };
}

export default useUpdateConnectionStatusHelper;
