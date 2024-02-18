import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useToggle } from '@/hooks';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge/Badge';
import {
  useReceivedConnections,
  useRequestedConnections,
} from '@/features/noums/hooks/spaceQuery';
import { ConnectionRequestStatus } from '@/apollo/generated/types';
import {
  InvitesAndRequestsContainer,
  RightSpinnerContainer,
  InviteLabel,
} from './styles';
import { RequestsAndInvitesModal } from '../Chamber/components/modals/RequestsAndInvites';
import RequestsAndInvitesModalV2 from './RequestsAndInvitesV2/modals/RequestsAndInvitesModalV2';

const InvitesAndRequests = () => {
  const {
    flags: { noumRequestsInvitesV2 },
  } = useLaunchDarkly();
  const [isModalOpen, toggleModalOpen] = useToggle();
  const { masterId: mainSpaceId } = useAuth();
  const { t } = useTranslation();

  const { data, loading } = useReceivedConnections();
  const {
    data: invitationData,
    loading: invitationLoading,
    refetch,
  } = useRequestedConnections({
    status: ConnectionRequestStatus.Invited,
  });

  return (
    <InvitesAndRequestsContainer isLoading={loading}>
      <Button
        size="full"
        rightIcon={
          loading || invitationLoading ? (
            <RightSpinnerContainer>
              {/* TODO Spinner color check */}
              <Spinner />
            </RightSpinnerContainer>
          ) : (
            <Badge
              size="large"
              text={(
                (data?.receivedConnectionRequest?.count || 0) +
                (invitationData?.requestedConnection?.count || 0)
              )?.toString()}
            />
          )
        }
      >
        <InviteLabel
          onClick={toggleModalOpen}
          colorToken="--text-button-neutral-default"
        >
          {t(`noumena.chamber.requests_and_invites`)}
        </InviteLabel>
      </Button>
      {noumRequestsInvitesV2 ? (
        <RequestsAndInvitesModalV2
          isOpen={isModalOpen}
          handleClose={toggleModalOpen}
          refetchReceivedRequests={refetch}
        />
      ) : (
        <RequestsAndInvitesModal
          isOpen={isModalOpen}
          isChambersScreen
          handleClose={toggleModalOpen}
          noumId={mainSpaceId}
        />
      )}
    </InvitesAndRequestsContainer>
  );
};

export default InvitesAndRequests;
