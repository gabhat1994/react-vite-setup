import { ConnectionRequestStatus } from '@/apollo/generated/types';
import { memo, useCallback } from 'react';
import { NetworkStatus } from '@apollo/client';
import { PAGE_BIG_SIZE, PAGE_SIZE } from '@/screens/Chambers/constants';
import {
  type ReceivedConnectionRequestQueryVariables,
  type RequestedConnectionQueryVariables,
  useReceivedConnectionRequestQuery,
  useRequestedConnectionQuery,
} from '@/apollo/graphql';
import { type BottomStatus } from '@/components/Infinite/types';
import { useBreakpoints } from '@/hooks';
import { Infinite } from '@/components/Infinite';
import { RequestsAndInvitesListWrapper } from './styles';
import RequestsAndInvitesItems from './RequestsAndInvitesItems';
import { type RequestsAndInvitesListProps } from './types';

const RequestsAndInvitesList = memo(
  (props: RequestsAndInvitesListProps) => {
    const { isMobile } = useBreakpoints();
    const { typeId, statusId, refetchReceivedRequests } = props;
    const isInvite = typeId === 'invites';
    const status = isInvite
      ? ConnectionRequestStatus.Invited
      : ConnectionRequestStatus.Requested;
    const isReceived = statusId === 'received';

    const variables:
      | RequestedConnectionQueryVariables
      | ReceivedConnectionRequestQueryVariables = {
      limit: isMobile ? PAGE_BIG_SIZE : PAGE_SIZE,
      status,
      offset: 0,
    };

    const {
      data: dataReceived,
      refetch: refetchReceived,
      loading: loadingReceived,
      fetchMore: fetchMoreReceived,
      networkStatus: networkStatusReceived,
    } = useReceivedConnectionRequestQuery({
      fetchPolicy: 'cache-and-network',
      variables,
    });

    const {
      data: dataSent,
      refetch: refetchSent,
      loading: loadingSent,
      fetchMore: fetchMoreSent,
      networkStatus: networkStatusSent,
    } = useRequestedConnectionQuery({
      fetchPolicy: 'cache-and-network',
      variables,
    });

    const { loading, refetch, networkStatus, items, totalCount, fetchMore } =
      isReceived
        ? {
            loading: loadingReceived,
            refetch: refetchReceived,
            networkStatus: networkStatusReceived,
            items: dataReceived?.receivedConnectionRequest?.data || [],
            totalCount: dataReceived?.receivedConnectionRequest?.count || 0,
            fetchMore: fetchMoreReceived,
          }
        : {
            loading: loadingSent,
            refetch: refetchSent,
            networkStatus: networkStatusSent,
            items: dataSent?.requestedConnection?.data || [],
            totalCount: dataSent?.requestedConnection?.count || 0,
            fetchMore: fetchMoreSent,
          };

    const infinityFetch = useCallback(
      async () =>
        fetchMore({
          variables: {
            offset: items?.length || 0,
          },
        }),
      [fetchMore, items?.length],
    );

    const paginating = networkStatus === NetworkStatus.fetchMore;
    const hasMore = items?.length < totalCount;
    const infiniteStatus: BottomStatus = paginating
      ? 'loading'
      : hasMore
      ? 'hasNextPage'
      : 'end';

    const onRefetch = () => {
      refetch();
      if (isReceived) refetchReceivedRequests?.();
    };

    return (
      <RequestsAndInvitesListWrapper fullWidth>
        <Infinite
          onFetchMore={infinityFetch}
          status={infiniteStatus}
          width="100%"
        >
          <RequestsAndInvitesItems
            isInvite={isInvite}
            isReceived={isReceived}
            refetch={onRefetch}
            data={items}
            loading={loading}
            isModal={true}
          />
        </Infinite>
      </RequestsAndInvitesListWrapper>
    );
  },
);

export default RequestsAndInvitesList;
