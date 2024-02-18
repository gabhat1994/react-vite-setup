import { type FC } from 'react';
import { type InvitedByMeListProps } from '@/screens/Chamber/components/RightPanel/elements/ReceivedRequests/types';
import { Stack } from '@/layout';
import { Spinner } from '@/components';
import { type ConnectionRequestTypeEnum } from '@/apollo/generated/types';

import { useRequestInvitationActions } from '@/screens/Chambers/RequestsAndInvitesV2/hooks';
import RequestsOrInvitesItemActions from '@/screens/Chambers/RequestsAndInvitesV2/components/RequestsOrInvitesItemActions';
import { Separator } from '@/components/Separator/Separator';
import { ReceivedMemberRequestInformation } from './ReceivedMemberRequestInformation';

const InvitesOrMyRequestsListV2: FC<InvitedByMeListProps> = ({
  data,
  loading,
  refetch,
}) => {
  const { actionHanlder } = useRequestInvitationActions();
  const handleActionClick = async (
    actionType: ConnectionRequestTypeEnum,
    memberId: string,
  ) => {
    await actionHanlder(actionType, false, memberId, '');
    refetch();
  };

  return (
    <Stack fixedHeight={loading ? 200 : undefined} vertical>
      {loading && data.length === 0 ? (
        <Spinner />
      ) : (
        data.map((item) => (
          <Stack vertical fullWidth key={item?._id} gap={10}>
            <Stack fullWidth align="center" vertical gap={15}>
              <Stack fullWidth>
                <ReceivedMemberRequestInformation
                  user={item.user}
                  gap={12}
                  type={item.noum?.type || ''}
                />
              </Stack>
              <Stack fullWidth>
                <RequestsOrInvitesItemActions
                  isReceived
                  handleActionClick={(actionType) =>
                    handleActionClick(actionType, item._id)
                  }
                />
              </Stack>
            </Stack>
            <Separator size="thin" fullWidth />
          </Stack>
        ))
      )}
    </Stack>
  );
};

export default InvitesOrMyRequestsListV2;
