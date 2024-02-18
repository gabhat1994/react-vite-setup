import { useState, type FC } from 'react';
import { t } from 'i18next';
import { type InvitedByMeListProps } from '@/screens/Chamber/components/RightPanel/elements/ReceivedRequests/types';
import { Stack } from '@/layout';
import { Button, Spinner } from '@/components';
import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import {
  type NoumMemberWithInvitationFragment,
  useCancelNoumInvitationMutation,
} from '@/apollo/graphql';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { LinkUnderline } from '../ConnectionDetailsModal/styles';
import {
  MemberRequestInformation,
  MembersModal,
} from '../../RequestInformation';

type ModalType = 'cancel';

const InvitesOrMyRequestsListV2: FC<InvitedByMeListProps> = ({
  connectionStatus,
  data,
  loading,
  refetch,
}) => {
  const [cancelNoumInvitation, { loading: cancelNoumInvitationLoader }] =
    useCancelNoumInvitationMutation();
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const [member, setMember] = useState<NoumMemberWithInvitationFragment>();
  const [selectedActionType, setSelectedActionType] = useState<
    ConnectionRequestTypeEnum | undefined
  >(undefined);
  const handleActionClick = (
    actionType: ConnectionRequestTypeEnum,
    item: NoumMemberWithInvitationFragment,
  ) => {
    openModal('cancel');
    setSelectedActionType(actionType);
    setMember(item);
  };
  const handleCloseActionModal = () => {
    closeModal();
    setSelectedActionType(undefined);
  };
  const handleActionConfirm = async (memberId: string) => {
    await cancelNoumInvitation({
      variables: {
        memberId,
      },
    });
    refetch();
    handleCloseActionModal();
  };
  const invitedText = `${t(
    'noumena.chamber.modal.requests_invites_invited',
  )} ${t('noumena.chamber.modal.requests_invites_on')}${' '}`;

  return (
    <Stack fixedHeight={loading ? 200 : undefined} vertical>
      {loading && data.length === 0 ? (
        <Spinner />
      ) : (
        data.map((item) => (
          <Stack vertical fullWidth key={item?._id}>
            <Stack fullWidth align="center">
              <Stack fullWidth>
                <MemberRequestInformation
                  user={item.user}
                  gap={12}
                  dateText={invitedText}
                  date={item.requestedAt}
                />
              </Stack>
              <Stack>
                <Button
                  size="small"
                  tertiary
                  onClick={() =>
                    handleActionClick(ConnectionRequestTypeEnum.Cancelled, item)
                  }
                >
                  {t(
                    `noumena.chamber.riseprogram.create_noum_modal.cancelButton`,
                  )}
                </Button>
              </Stack>
            </Stack>
            <Stack vertical fullWidth>
              <LinkUnderline />
            </Stack>
          </Stack>
        ))
      )}
      {member && (
        <MembersModal
          isOpen={modalType === 'cancel'}
          actionType={selectedActionType}
          onClose={handleCloseActionModal}
          onConfirm={() => handleActionConfirm(member?._id || '')}
          isActionLoading={cancelNoumInvitationLoader}
          connectionStatus={connectionStatus}
          user={member?.user}
          date={member?.requestedAt}
          dateText={invitedText}
        />
      )}
    </Stack>
  );
};

export default InvitesOrMyRequestsListV2;
