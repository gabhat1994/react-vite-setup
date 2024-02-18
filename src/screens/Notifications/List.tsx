import { startOfDay } from 'date-fns';
import { groupBy } from 'lodash';
import React, { useMemo } from 'react';
import { t } from 'i18next';
import { NetworkStatus } from '@apollo/client';
import { Stack } from '@/layout';
import { getBottomStatusFromQuery, Infinite } from '@/components/Infinite';
import { TSpan } from '@/components/Typography';
import { Spinner } from '@/components/Spinner';
import { InfiniteSpinner } from '@/components/Infinite/Infinite';
import NotificationGateway from './NotificationGateway/NotificationGateway';
import SectionTitle from './SectionTitle';
import { type NotificationsListProps } from './types';
import { SectionNotifications } from './styles';

const NotificationsList = ({
  notifications,
  totalCount,
  networkStatus,
  fetchNextPage,
}: NotificationsListProps): JSX.Element => {
  const notificationsByDate = useMemo(
    () =>
      groupBy(notifications, (n) =>
        startOfDay(new Date(n.updatedAt)).toISOString(),
      ),
    [notifications],
  );

  if (notifications.length === 0) {
    return (
      <Stack grow align="center" justify="center">
        {networkStatus === NetworkStatus.ready ? (
          <TSpan
            data-testid="empty-list"
            font="body-m"
            colorToken="--text-placeholder-neutral-default"
          >
            {t('noumena.notifications.empty_list')}
          </TSpan>
        ) : (
          <Spinner />
        )}
      </Stack>
    );
  }

  return (
    <Infinite
      onFetchMore={fetchNextPage}
      status={getBottomStatusFromQuery({
        networkStatus,
        totalCount,
        currentCount: notifications.length,
      })}
      grow
      width="100%"
      disableFetchMoreWhileLoading={true}
      isSpinnerRelative
    >
      {[NetworkStatus.refetch, NetworkStatus.loading].includes(
        networkStatus,
      ) && <InfiniteSpinner status="loading" reverse />}
      <Stack
        vertical
        fullWidth
        gap={4}
        align="stretch"
        data-testid="notifications-list"
        padding={24}
      >
        {Object.entries(notificationsByDate).map(
          ([date, sectionNotifications]) => (
            <React.Fragment key={date}>
              <SectionTitle date={new Date(date)} />
              <SectionNotifications>
                {sectionNotifications.map((notification) => (
                  <NotificationGateway
                    key={notification._id}
                    notification={notification}
                  />
                ))}
              </SectionNotifications>
            </React.Fragment>
          ),
        )}
      </Stack>
    </Infinite>
  );
};

export default NotificationsList;
