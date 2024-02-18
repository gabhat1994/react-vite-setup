import { ConnectionRequestStatus } from '@/apollo/generated/types';
import { type MyRequestsTabProps } from '@/screens/Chamber/components/modals/RequestsAndInvites/types';
import InvitesOrMyRequestsList from '@/screens/Chamber/components/modals/RequestsAndInvites/InvitesOrMyRequestsList';
import { useRequestedConnections } from '@/features/noums/hooks/spaceQuery';
import { Infinite } from '@/components/Infinite';
import { useRequestedConnectionsInfiniteData } from '@/features/noums/hooks';

const MyRequestsTab: React.FC<MyRequestsTabProps> = ({ noumId }) => {
  const pageSize = 10;
  const { data, refetch, loading, fetchMore } = useRequestedConnections({
    limit: pageSize,
    status: ConnectionRequestStatus.Requested,
  });

  const { infiniteData, infiniteState, infinityFetch } =
    useRequestedConnectionsInfiniteData({ data, pageSize, fetchMore });

  return (
    <Infinite
      onFetchMore={infinityFetch}
      status={infiniteState}
      paddingRight={infiniteData ? '12px' : '0'}
      isSpinnerRelative
      width="100%"
      style={{
        overflowX: 'hidden',
      }}
    >
      <InvitesOrMyRequestsList
        refetch={refetch}
        chamberId={noumId}
        data={infiniteData}
        loading={loading}
        isModal={true}
      />
    </Infinite>
  );
};

export default MyRequestsTab;
