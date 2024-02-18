import { useEventsSubscription } from '@/apollo/graphql';
import { useGetInvitedEventsCountQuery } from '@/apollo/graphql/queries';
import { ConversationUnreadStatusContext } from '@/features/conversation/contexts/ConversationUnreadStatusContext';
import { useAuth } from '@/features/auth/contexts';
import { useAppBadge } from '@/hooks/appBadge';
import { useUnreadNotificationsCount } from '@/screens/Notifications/hooks/notificationsList';
import { useContext, useEffect, useLayoutEffect } from 'react';

export function useUnreadCounters() {
  const { user, masterId } = useAuth();
  const { setAppBadge } = useAppBadge();

  const { unviewedNotificationsCount } = useUnreadNotificationsCount({
    pollInterval: 10000,
    skip: !user?._id,
  });

  const { data: invitedEventsCountData, refetch } =
    useGetInvitedEventsCountQuery({
      skip: !masterId,
      variables: {
        chamberId: masterId || '',
      },
    });

  const { data: eventSubscriptionData } = useEventsSubscription({
    skip: !user?._id,
    variables: { userId: user?._id || '' },
  });
  const { unreadConversationsCount } = useContext(
    ConversationUnreadStatusContext,
  );

  useEffect(() => {
    refetch();
  }, [eventSubscriptionData, unviewedNotificationsCount, refetch]);

  const invitedEventsCount = invitedEventsCountData?.getEvents?.count ?? 0;

  useLayoutEffect(() => {
    setAppBadge(
      unviewedNotificationsCount +
        invitedEventsCount +
        unreadConversationsCount,
    );
  }, [
    invitedEventsCount,
    setAppBadge,
    unreadConversationsCount,
    unviewedNotificationsCount,
  ]);

  return {
    events: invitedEventsCount,
    notifications: unviewedNotificationsCount,
    messages: unreadConversationsCount,
  };
}
