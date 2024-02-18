import { type FC } from 'react';
import { Stack } from '@/layout';
import { t } from 'i18next';
import { Button } from '@/components';
import {
  useApproveConnectionRequestMutation,
  useRejectConnectionRequestMutation,
} from '@/apollo/graphql';
import { UserUtil } from '@/utils/user';
import { SpaceTypeEnum } from '@/apollo/generated/types';
import { Separator } from '@/components/Separator/Separator';
import { type ReceivedListProps } from './types';
import { NoResultsContainer } from '../../../modals/ConnectionDetailsModal/styles';
import {
  MemberRequestInformation,
  ProjectRequestInformation,
} from '../../../RequestInformation';
import { ReceivedRequest } from './styles';

const RequestListV2: FC<ReceivedListProps> = ({
  data,
  refetchReceivedRequests,
}) => {
  const [approveRequest] = useApproveConnectionRequestMutation();
  const [rejectRequest] = useRejectConnectionRequestMutation();
  const onAcceptClick = (connectionRequestId: string) => {
    approveRequest({
      variables: {
        connectionRequestId,
      },
    });
    refetchReceivedRequests();
  };
  const onDeclineClick = (connectionRequestId: string) => {
    rejectRequest({
      variables: {
        connectionRequestId,
      },
    });
    refetchReceivedRequests();
  };

  if (data.length === 0) {
    return (
      <NoResultsContainer>
        <ReceivedRequest>
          {t(`noumena.chamber.You_dont_have_any_requests`)}
        </ReceivedRequest>
      </NoResultsContainer>
    );
  }

  return (
    <>
      {data.map((item) => (
        <Stack vertical fullWidth key={item?._id}>
          <Stack fullWidth align="center" vertical gap={16}>
            <Stack fullWidth>
              {item.noum?.type === SpaceTypeEnum.Home ? (
                <MemberRequestInformation
                  user={item.user}
                  gap={12}
                  date={item.requestedAt}
                  type={item.noum?.type || ''}
                />
              ) : (
                <ProjectRequestInformation
                  profileURL={item.noum?.profileImage || ''}
                  projectName={item.noum?.name || ''}
                  noumId={item.noum?._id || ''}
                  userName={UserUtil.renderFullName(item.user)}
                  isRequested
                />
              )}
            </Stack>
            <Stack fullWidth gap={5}>
              <Button
                data-testid="decline-button"
                onClick={() => onDeclineClick(item._id)}
                tertiary
                size="full_small"
              >
                {t(`noumena.Decline`)}{' '}
              </Button>
              <Button
                data-testid="accept-button"
                onClick={() => onAcceptClick(item._id)}
                secondary
                size="full_small"
              >
                {t(`noumena.Accept`)}
              </Button>
            </Stack>
            <Separator size="thin" noMargin fullWidth />
          </Stack>
        </Stack>
      ))}
    </>
  );
};

export default RequestListV2;
