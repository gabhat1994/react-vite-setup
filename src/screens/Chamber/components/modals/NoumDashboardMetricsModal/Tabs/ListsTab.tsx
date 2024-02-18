import { type DateRange } from 'react-day-picker';
import { t } from 'i18next';
import { useCallback, useMemo } from 'react';
import { getBottomStatusFromQuery, Infinite } from '@/components/Infinite';
import { Stack } from '@/layout';
import { Spinner } from '@/components/Spinner';
import { NoumMemberStatus } from '@/apollo/generated/types';
import { useNoumMembersManagerList } from '@/features/noums/hooks/manageMembers';
import { useLaunchDarkly } from '@/hooks';
import { PAGE_SIZE } from '@/screens/Chambers/constants';
import { NoumDashboardMetricsModalTabEnum } from '../types';
import { useNoumDashboardListsHelper } from '../useNoumDashboardListsHelper';
import { TextOnlySpan } from '../styles';
import { ListItemContent } from './ListItemContent';
import { SpinnerContainer } from './styles';
import { MemberRequestInformation } from '../../../RequestInformation';

const ListsTab = ({
  selectedTab,
  dateRange,
  noumId,
}: {
  selectedTab: NoumDashboardMetricsModalTabEnum;
  dateRange: DateRange;
  noumId: string;
}) => {
  const { flags } = useLaunchDarkly();
  const hasMemberConnections =
    flags.elementPermission &&
    selectedTab === NoumDashboardMetricsModalTabEnum.Connected;
  const {
    currentData,
    loading,
    totalCount: totalCountOld,
    networkStatus: networkStatusOld,
    fetchMore,
  } = useNoumDashboardListsHelper(
    hasMemberConnections ? '' : noumId,
    selectedTab,
    dateRange,
  );

  const {
    membersData,
    currentCount: membersCurrentCount,
    totalCount: membersTotalCount,
    networkStatus: membersNetworkStatus,
    fetchMore: membersFetchMore,
  } = useNoumMembersManagerList({
    noumId,
    rowsPerPage: PAGE_SIZE,
    defaultStatuses: [NoumMemberStatus.Connected],
    skip: !hasMemberConnections,
  });

  const connectedText = t('noumena.chamber.link.connection_date');

  const fetchMoreHandler = useCallback(() => {
    if (hasMemberConnections) {
      membersFetchMore();
    } else {
      fetchMore();
    }
  }, [fetchMore, hasMemberConnections, membersFetchMore]);

  const totalCount = hasMemberConnections ? membersTotalCount : totalCountOld;
  const currentCount = hasMemberConnections
    ? membersCurrentCount
    : currentData?.length;
  const networkStatus = hasMemberConnections
    ? membersNetworkStatus
    : networkStatusOld;

  const listsComponent = useMemo(() => {
    if (loading) {
      return null;
    }
    if (hasMemberConnections) {
      return membersData.map((item) => (
        <MemberRequestInformation
          key={item?._id}
          user={item.user}
          gap={16}
          dateText={connectedText}
          date={item.connectedAt}
        />
      ));
    }
    if (currentData && currentData.length > 0) {
      return currentData.map((item) => (
        <ListItemContent
          key={item?._id}
          item={item}
          selectedTab={selectedTab}
          gap={16}
        />
      ));
    }
    return (
      <Stack fullWidth justify="center">
        <TextOnlySpan
          font="body-l"
          colorToken="--text-card-neutral-highlighted"
        >
          {t('noumena.chamber.link.no_value', { value: selectedTab })}
        </TextOnlySpan>
      </Stack>
    );
  }, [
    loading,
    hasMemberConnections,
    currentData,
    selectedTab,
    membersData,
    connectedText,
  ]);

  return loading ? (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  ) : (
    <Infinite
      onFetchMore={fetchMoreHandler}
      status={getBottomStatusFromQuery({
        networkStatus,
        totalCount,
        currentCount,
      })}
      disableFetchMoreWhileLoading={true}
      isSpinnerRelative
      paddingRight={currentData && currentData.length > 0 ? '12px' : '0'}
      style={{
        overflowX: 'hidden',
      }}
      width="100%"
    >
      {listsComponent}
    </Infinite>
  );
};
export default ListsTab;
