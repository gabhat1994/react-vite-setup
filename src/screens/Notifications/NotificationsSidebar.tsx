import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNotificationsUnreadCountQuery } from '@/apollo/graphql/queries';
import { Button } from '@/components/Button';
import { SideModal } from '@/components/SideModal';
import { useAuth } from '@/features/auth/contexts';
import { Stack } from '@/layout';
import { NotificationType } from '@/apollo/generated/types';
import { cleanList } from '@/utils/list';
import { useNotificationsList } from './hooks/notificationsList';
import { useNotificationStatus } from './hooks/notificationStatus';
import NotificationsList from './List';
import { NotificationHandlersProvider } from './NotificationHandlersContext';
import {
  NotificationFilterCategory,
  type FilterItem,
  type NotificationsSidebarProps,
} from './types';
import CategoriesFilter from './Filters/Filters';
import { getNotificationCategory } from './Filters/getNotificationCategory';

const NotificationsSidebar = ({
  open,
  onClickEvent,
  onClose,
  handleTokenNotification,
  ...sideModalProps
}: NotificationsSidebarProps) => {
  const [category, setCategory] = useState<NotificationFilterCategory>(
    NotificationFilterCategory.All,
  );

  const isVisible = open;

  const { masterId, user } = useAuth();

  const { markAllAsRead, markOneAsRead, markAllAsViewed } =
    useNotificationStatus();
  const { data, fetchNextPage, networkStatus } = useNotificationsList({
    skip: !isVisible,
    variables: {
      filter: {
        category: getNotificationCategory(category),
      },
    },
  });

  const { data: unReadData, refetch: refetchUnreadCount } =
    useNotificationsUnreadCountQuery({
      pollInterval: 5000,
      skip: !user?._id || !isVisible,
    });

  const handleMarkAllAsRead = useCallback(async () => {
    await markAllAsRead(getNotificationCategory(category));
    await refetchUnreadCount();
  }, [category, markAllAsRead, refetchUnreadCount]);

  const notifications = useMemo(
    () => cleanList(data?.notifications?.data),
    [data?.notifications?.data],
  );
  const totalCount = data?.notifications?.count ?? 0;

  const filterItems = useMemo<FilterItem[]>(
    () => [
      {
        label: 'All',
        value: NotificationFilterCategory.All,
        unread: (unReadData?.notificationsUnreadCount?.total ?? 0) > 0,
      },
      {
        label: 'Noums',
        value: NotificationFilterCategory.Noums,
        unread: (unReadData?.notificationsUnreadCount?.Noums ?? 0) > 0,
      },
      {
        label: 'Money',
        value: NotificationFilterCategory.Money,
        unread: (unReadData?.notificationsUnreadCount?.Money ?? 0) > 0,
      },
      {
        label: 'Community',
        value: NotificationFilterCategory.Community,
        unread: (unReadData?.notificationsUnreadCount?.Community ?? 0) > 0,
      },
      {
        label: 'Other',
        value: NotificationFilterCategory.Other,
        unread: (unReadData?.notificationsUnreadCount?.Other ?? 0) > 0,
      },
    ],
    [
      unReadData?.notificationsUnreadCount?.Community,
      unReadData?.notificationsUnreadCount?.Money,
      unReadData?.notificationsUnreadCount?.Noums,
      unReadData?.notificationsUnreadCount?.Other,
      unReadData?.notificationsUnreadCount?.total,
    ],
  );

  const tokenNotification = useMemo(
    () =>
      notifications.find(
        (notification) =>
          notification?.unread &&
          notification?.type === NotificationType.TokenRewarded,
      ),
    [notifications],
  );

  useEffect(() => {
    if (tokenNotification) {
      markOneAsRead(tokenNotification);
      handleTokenNotification?.(tokenNotification);
    }
  }, [tokenNotification, handleTokenNotification, markOneAsRead]);

  useEffect(() => {
    if (isVisible && notifications.length > 0) {
      markAllAsViewed();
    }
  }, [isVisible, markAllAsViewed, notifications.length]);

  if (!isVisible) {
    return null;
  }

  return (
    <SideModal
      placement="right"
      showCloseButton
      enableAnimation
      padding={0}
      title={t('noumena.notifications.header')}
      open={open}
      onClose={onClose}
      actionButton={
        notifications.length > 0 ? (
          <Button textOnly size="small" onClick={handleMarkAllAsRead}>
            {t('noumena.notifications.mark_all_as_read')}
          </Button>
        ) : undefined
      }
      {...sideModalProps}
    >
      <Stack vertical fullWidth align="stretch" justify="stretch">
        <CategoriesFilter
          items={filterItems}
          value={category}
          onChange={setCategory}
        />
        <NotificationHandlersProvider
          masterId={masterId}
          userStatus={user?.userStatus}
          onClose={onClose}
          onNotificationRead={markOneAsRead}
          onEventDetails={onClickEvent}
        >
          <NotificationsList
            notifications={notifications}
            totalCount={totalCount}
            fetchNextPage={fetchNextPage}
            networkStatus={networkStatus}
          />
        </NotificationHandlersProvider>
      </Stack>
    </SideModal>
  );
};

export default NotificationsSidebar;
