import { useCallback } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import {
  AllUsersForInviteDocument,
  type AllUsersForInviteQuery,
  useCreateMultipleEventInvitationMutation,
} from '@/apollo/graphql';
import { useToast } from '@/hooks/toast';

export const useMultipleInvitation = () => {
  const { addToast } = useToast();
  const [createMultipleEventInvitation, { loading, error }] =
    useCreateMultipleEventInvitationMutation();

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
    addToast('primary', 'icon', t('noumena.social_hall.invite.sent'));
  }, [addToast]);

  const createMultipleInvitation = useCallback(
    async (eventId: string, userIds: Array<string>, search?: string) => {
      let isSuccess;
      await createMultipleEventInvitation({
        variables: {
          id: eventId,
          userIds,
        },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          isSuccess = false;
          const [err] = graphQLErrors;
          handleError(err?.message ?? networkError);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'createMultipleEventInvitation',
            },
          });
        },
        onCompleted: () => {
          handleSuccess();
        },
        update: (cache, { data }) => {
          if (!data || !data.createMultipleEventInvitation) return;

          const cacheUsers = cache.readQuery({
            query: AllUsersForInviteDocument,
            variables: { search, eventId },
          }) as AllUsersForInviteQuery;

          if (!cacheUsers?.allUsers) return;

          const cloneUsersData = cacheUsers.allUsers.data!.map((user) => {
            if (userIds.includes(user!._id)) {
              const getEventUserRole = data.createMultipleEventInvitation.find(
                (c) => c.userId === user?._id,
              );
              const updatedUser = {
                ...user,
                getEventUserRole,
              };
              return updatedUser;
            }
            return user;
          });

          cache.writeQuery({
            query: AllUsersForInviteDocument,
            variables: { search, eventId },
            data: {
              allUsers: {
                data: cloneUsersData,
                count: cacheUsers.allUsers.count,
              },
            },
          });
          isSuccess = true;
        },
      });
      return isSuccess;
    },
    [createMultipleEventInvitation, handleError, handleSuccess],
  );
  return { createMultipleInvitation, loading, error };
};

export default useMultipleInvitation;
