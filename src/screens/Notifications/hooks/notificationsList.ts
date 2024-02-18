import { type QueryHookOptions, useApolloClient } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import {
  NotificationsDocument,
  type NotificationsQuery,
  type NotificationsQueryVariables,
  type UnreadNotificationsCountQuery,
  type UnreadNotificationsCountQueryVariables,
  useNotificationsQuery,
  useUnreadNotificationsCountQuery,
} from '@/apollo/graphql';
import { usePrevious } from '@/hooks/previous';
import { trackEvent } from '@/utils/tracking';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { NotificationType } from '@/apollo/generated/types';

export function useNotificationsList(
  options: QueryHookOptions<
    NotificationsQuery,
    NotificationsQueryVariables
  > = {},
) {
  const { data, fetchMore, refetch, ...query } = useNotificationsQuery({
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    refetchWritePolicy: 'overwrite',
    ...options,
    variables: {
      offset: 0,
      limit: 20,
      ...options.variables,
    },
  });

  const notifications = data?.notifications?.data;

  // @TODO: Remove this once we get a subscription from BE.
  useEffect(() => {
    const EVENT_SENT_SIGN_UP_APPROVED = getLocalStorage(
      accessLocalStorage.EVENT_SENT_SIGN_UP_APPROVED,
    );
    if (!EVENT_SENT_SIGN_UP_APPROVED) {
      const hasUserActive = notifications?.some(
        (item) => item?.type === NotificationType.UserActive,
      );
      if (hasUserActive) {
        trackEvent('SIGN_UP_APPROVED');
        setLocalStorage(accessLocalStorage.EVENT_SENT_SIGN_UP_APPROVED, true);
      }
    }
  }, [notifications]);

  const fetchNextPage = useCallback(async () => {
    await fetchMore({
      variables: {
        offset: data?.notifications?.data?.length ?? 0,
      },
    });
  }, [fetchMore, data?.notifications?.data?.length]);

  return {
    ...query,
    fetchMore,
    data,
    fetchNextPage,
  };
}

export function useUnreadNotificationsCount(
  options: QueryHookOptions<
    UnreadNotificationsCountQuery,
    UnreadNotificationsCountQueryVariables
  > = {},
) {
  const apolloClient = useApolloClient();

  const query = useUnreadNotificationsCountQuery({
    ...options,
    variables: {
      // This is to keep it in sync with cached notifications list query.
      offset: 0,
      limit: 20,
      ...options.variables,
      filter: {
        ...options.variables?.filter,
        category: null,
      },
    },
  });

  const unreadCount = query.data?.unreadNotifications?.unreadCount ?? 0;
  const unviewedCount = query.data?.unreadNotifications?.unviewedCount ?? 0;
  const prevUnreadCount = usePrevious(query.loading ? undefined : unreadCount);

  useEffect(() => {
    // Simulates a subscription...
    if (
      typeof prevUnreadCount !== 'undefined' &&
      unreadCount > prevUnreadCount
    ) {
      apolloClient.refetchQueries({
        include: [NotificationsDocument],
      });
    }
  }, [apolloClient, prevUnreadCount, unreadCount]);

  return {
    ...query,
    unreadNotificationsCount: unreadCount,
    unviewedNotificationsCount: unviewedCount,
  };
}
