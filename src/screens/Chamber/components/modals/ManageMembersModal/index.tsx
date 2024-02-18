import { type NoumMemberWithInvitationFragment } from '@/apollo/graphql';
import { Modal } from '@/components/ExtendedModal';
import routes from '@/constants/routes';
import { Stack } from '@/layout';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate, useParams } from 'react-router';
import {
  useMembersManagerActions,
  useNoumMembersManagerList,
} from '@/features/noums/hooks/manageMembers';
import { NoumMemberStatus } from '@/apollo/generated/types';
import { NoumPageTable } from './NoumPageTable';
import { Body, CloseButton, Header, Title } from './styles';
import { type ManageMembersModalProps, type RowActionType } from './types';

const ROWS_PER_PAGE = 20;

export const ManageMembersModal = ({
  isOpen,
  handleClose,
}: ManageMembersModalProps) => {
  const { id: noumId = '' } = useParams();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    currentCount,
    totalCount,
    membersData,
    networkStatus,
    fetchMore,
    refetch,
  } = useNoumMembersManagerList({
    noumId,
    rowsPerPage: ROWS_PER_PAGE,
    skip: !isOpen,
    defaultStatuses: [
      NoumMemberStatus.Connected,
      NoumMemberStatus.Invited,
      NoumMemberStatus.Requested,
    ],
  });

  const {
    openModal,
    approveConnectionRequest,
    disconnectModalElement,
    editRoleModalElement,
    inviteMemberModalElement,
    rejectRequestModalElement,
    cancelRolePromotionModalElement,
  } = useMembersManagerActions({
    noumId,
    onInvite: refetch,
    onDisconnect: refetch,
    onEditRoles: refetch,
    onApproveConnectionRequest: refetch,
    onRejectConnectionRequest: refetch,
  });

  const handleRowActionSelect = (
    value: RowActionType,
    item: NoumMemberWithInvitationFragment,
  ) => {
    switch (value) {
      case 'manager_details':
        if (!item.user?.chamber?._id) return;
        navigate(
          generatePath(routes.NOUM_MANAGER_DETAILS, {
            id: noumId,
            memberId: item._id,
          }),
        );
        break;
      case 'view_home_noum':
        if (!item.user?.chamber?._id) return;
        navigate(generatePath(routes.NOUM, { id: item.user.chamber._id }));
        break;
      case 'edit_role':
        openModal('edit-role', [item]);
        break;
      case 'disconnect':
        openModal('disconnect', [item]);
        break;
      case 'approve_request':
        if (item.activeRequest?._id)
          approveConnectionRequest(item.activeRequest?._id);
        break;
      case 'reject_request':
        openModal('reject-request', [item]);
        break;
      case 'cancel_manager_invite':
        openModal('cancel-manager-invite', [item]);
        break;
    }
  };

  const handleBulkAction = (
    value: RowActionType,
    items: NoumMemberWithInvitationFragment[],
  ) => {
    switch (value) {
      case 'edit_role':
        openModal('edit-role', items);
        break;
      case 'disconnect':
        openModal('disconnect', items);
        break;
    }
  };

  return (
    <>
      <Modal
        style={{ padding: 0 }}
        forceHideCloseButton
        testId="ManageMembers"
        open={isOpen}
        onClose={handleClose}
        isFullScreen
        disableEscapeKeyDown
      >
        <Stack
          vertical
          fullWidth
          justify="stretch"
          align="stretch"
          maxHeight="100vh"
          overflow="hidden"
        >
          <Header>
            <Title>{t('noumena.chamber_edit.manage_members.title')}</Title>
            <CloseButton primary size="small" onClick={handleClose}>
              Done
            </CloseButton>
          </Header>

          <Body>
            <NoumPageTable
              data={membersData}
              currentCount={currentCount}
              totalCount={totalCount}
              fetchMore={fetchMore}
              refetch={refetch}
              networkStatus={networkStatus}
              rowsPerPage={ROWS_PER_PAGE}
              onRowActionSelect={handleRowActionSelect}
              onBulkAction={handleBulkAction}
              onInviteMembers={() => openModal('invite-members')}
            />
          </Body>
        </Stack>
      </Modal>

      {inviteMemberModalElement}
      {editRoleModalElement}
      {disconnectModalElement}
      {rejectRequestModalElement}
      {cancelRolePromotionModalElement}
    </>
  );
};
