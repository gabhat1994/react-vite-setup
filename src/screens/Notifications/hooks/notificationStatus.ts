import { useCallback } from 'react';
import {
  NotificationsDocument,
  type NotificationsQuery,
  NotificationsUnreadCountDocument,
  type NotificationsUnreadCountQuery,
  UnreadNotificationsCountDocument,
  type UnreadNotificationsCountQuery,
  useMarkNotificationAsReadMutation,
  useMarkNotificationsAsViewedMutation,
  useUpdateNotificationsReadStatusMutation,
  type NotificationFragment,
} from '@/apollo/graphql';
import { type NotificationCategory } from '@/apollo/generated/types';
import { cleanList } from '@/utils/list';

export function useNotificationStatus() {
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [updateNotificationReadStatus] =
    useUpdateNotificationsReadStatusMutation();
  const [markNotificationsAsViewed] = useMarkNotificationsAsViewedMutation();

  const handleNotificationRead = useCallback(
    async (notification: NotificationFragment) => {
      if (notification._id && notification.unread) {
        await markAsRead({
          variables: { id: notification._id },
          refetchQueries: [UnreadNotificationsCountDocument],
          errorPolicy: 'ignore',
        });
      }
    },
    [markAsRead],
  );

  const handleAllNotificationsRead = useCallback(
    async (category: NotificationCategory | null) => {
      await updateNotificationReadStatus({
        variables: { _id: null },
        update(cache, result) {
          const newUnreadCount =
            result.data?.updateNotificationsReadStatus?.unreadCount;

          if (typeof newUnreadCount === 'number') {
            cache.updateQuery<NotificationsQuery>(
              {
                query: NotificationsDocument,
                variables: { filter: { category } },
              },
              (data) => {
                if (data === null) {
                  return null;
                }

                const newData = {
                  notifications: data?.notifications
                    ? {
                        ...data.notifications,
                        data: data.notifications.data
                          ? cleanList(data.notifications.data).map(
                              (notification) => ({
                                ...notification,
                                unread: false,
                              }),
                            )
                          : null,
                        unreadCount: newUnreadCount,
                      }
                    : null,
                };

                return newData;
              },
            );
            cache.updateQuery<NotificationsUnreadCountQuery>(
              {
                query: NotificationsUnreadCountDocument,
                variables: {},
              },
              (data) => {
                if (data === null) {
                  return null;
                }

                const newData = {
                  notificationsUnreadCount: {
                    total: 0,
                    Noums: 0,
                    Community: 0,
                    Money: 0,
                    Other: 0,
                  },
                };

                return newData;
              },
            );
          }
        },
      });
    },
    [updateNotificationReadStatus],
  );

  const handleAllNotificationsViewed = useCallback(() => {
    markNotificationsAsViewed({
      variables: {
        date: new Date().toISOString(),
      },
      update(cache) {
        cache.updateQuery<UnreadNotificationsCountQuery>(
          {
            query: UnreadNotificationsCountDocument,
            variables: { filter: { category: null } },
          },
          (data) => {
            if (data === null) {
              return null;
            }

            return {
              ...data,
              unreadNotifications: {
                ...data.unreadNotifications,
                unviewedCount: 0,
              },
            };
          },
        );
      },
    });
  }, [markNotificationsAsViewed]);

  return {
    markOneAsRead: handleNotificationRead,
    markAllAsRead: handleAllNotificationsRead,
    markAllAsViewed: handleAllNotificationsViewed,
  };
}
