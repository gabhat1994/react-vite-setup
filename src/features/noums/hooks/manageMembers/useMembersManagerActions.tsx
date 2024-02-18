import {
  useCancelNoumInvitationMutation,
  useChangeNoumMembersRoleMutation,
  useInviteNoumMembersMutation,
  useKickNoumMembersMutation,
  useApproveConnectionRequestMutation,
  type NoumMemberWithInvitationFragment,
  useRejectConnectionRequestMutation,
  useInviteNonNoumenaMemberMutation,
  useCancelNoumMemberRolePromotionMutation,
} from '@/apollo/graphql';
import { useToast } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { ChamberInviteModal } from '@/screens/Chamber/components/modals/ChamberVisibilityInvite';
import { InviteMembersFormMapper } from '@/screens/Chamber/components/modals/ChamberVisibilityInvite/InviteMembers/ViaNoumMembers/InviteMember/mappers';
import { type InviteMembersValues } from '@/screens/Chamber/components/modals/ChamberVisibilityInvite/InviteMembers/ViaNoumMembers/InviteMember/schema';
import { InviteNonMemberFormMapper } from '@/screens/Chamber/components/modals/ChamberVisibilityInvite/InviteMembers/ViaNoumMembers/InviteNonMember/mappers';
import { type InviteNonMemberValues } from '@/screens/Chamber/components/modals/ChamberVisibilityInvite/InviteMembers/ViaNoumMembers/InviteNonMember/schema';
import { useTranslation } from 'react-i18next';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { MembersDisconnectModal } from '../../components/MembersDisconnectModal';
import { MembersEditRoleModal } from '../../components/MembersEditRoleModal';
import { type MemberEditRoleFormValues } from '../../components/MembersEditRoleModal/schema';
import { MemberUtils, getBulkMembersActionTranslationMeta } from '../../utils';
import { MemberRejectRequestModal } from '../../components/MemberRejectRequestModal';
import { CancelRolePromotionModal } from '../../components/CancelRolePromotionModal';

type ModalType =
  | 'invite-members'
  | 'edit-role'
  | 'disconnect'
  | 'reject-request'
  | 'cancel-manager-invite';

interface UseMembersManagerActionsOptions {
  noumId?: string;
  onInvite?: () => void;
  onDisconnect?: () => void;
  onEditRoles?: () => void;
  onApproveConnectionRequest?: () => void;
  onRejectConnectionRequest?: () => void;
}

export function useMembersManagerActions({
  noumId,
  onInvite,
  onDisconnect,
  onEditRoles,
  onApproveConnectionRequest,
  onRejectConnectionRequest,
}: UseMembersManagerActionsOptions) {
  const { space } = useNoumContext();

  const { getModalKey, modalType, contextData, openModal, closeModal } =
    useModalManager<ModalType, NoumMemberWithInvitationFragment[]>({
      resetModalKey: true,
    });
  const { addSuccessIconToast, addErrorToast } = useToast();
  const { t } = useTranslation();

  const [kickNoumMembers, { loading: isKickMembersLoading }] =
    useKickNoumMembersMutation();
  const [changeMembersRole, { loading: isChangeRolesLoading }] =
    useChangeNoumMembersRoleMutation();
  const [cancelNoumInvitation] = useCancelNoumInvitationMutation();
  const [inviteMembers] = useInviteNoumMembersMutation();
  const [inviteNonNoumenaMember] = useInviteNonNoumenaMemberMutation();
  const [approveRequest] = useApproveConnectionRequestMutation();
  const [rejectRequest] = useRejectConnectionRequestMutation();
  const [cancelNoumMemberRolePromotionMutation] =
    useCancelNoumMemberRolePromotionMutation();

  const handleDisconnectMembers = async () => {
    const members = contextData;
    if (!members || members.length === 0) {
      return;
    }

    try {
      const membersToKick = members.filter(MemberUtils.isConnected);
      const membersToCancelInvitationFor = members.filter(
        MemberUtils.hasPendingInvitation,
      );

      // TODO: Refactor once we get a bulk-cancel mutation in GQL schema.
      await Promise.all(
        membersToCancelInvitationFor.map((member) =>
          cancelNoumInvitation({
            variables: {
              memberId: member._id,
            },
          }),
        ),
      );
      await kickNoumMembers({
        variables: {
          memberIDs: membersToKick.map((member) => member._id),
        },
      });

      const { translationSuffix, membersCount, managersCount } =
        getBulkMembersActionTranslationMeta(members);
      addSuccessIconToast(
        t(
          `noumena.chamber.disconnect_member_modal.success_toast.${translationSuffix}`,
          { membersCount, managersCount },
        ),
      );

      onDisconnect?.();
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    } finally {
      closeModal();
    }
  };

  const disconnectModalElement = (
    <MembersDisconnectModal
      key={getModalKey('disconnect')}
      isOpen={modalType === 'disconnect'}
      onClose={closeModal}
      onConfirm={handleDisconnectMembers}
      members={contextData ?? []}
      isLoading={isKickMembersLoading}
    />
  );

  const handleEditRoles = async (values: MemberEditRoleFormValues) => {
    const members = contextData;
    if (!members || members.length === 0) {
      return;
    }

    try {
      await changeMembersRole({
        variables: {
          input: {
            memberIDs: members.map((member) => member._id),
            roleId: values.roleId,
          },
        },
      });

      onEditRoles?.();
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    } finally {
      closeModal();
    }
  };

  const editRoleModalElement = (
    <MembersEditRoleModal
      key={getModalKey('edit-role')}
      isOpen={modalType === 'edit-role'}
      onClose={closeModal}
      onConfirm={handleEditRoles}
      members={contextData ?? []}
      isLoading={isChangeRolesLoading}
    />
  );

  const handleInviteMembers = async (values: InviteMembersValues) => {
    if (!noumId) return;

    try {
      await inviteMembers({
        variables: {
          input: InviteMembersFormMapper.toInviteMembersInput(noumId, values),
        },
      });

      onInvite?.();
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    }
  };
  const handleInviteNonMembers = async (values: InviteNonMemberValues) => {
    if (!noumId) return;

    try {
      await inviteNonNoumenaMember({
        variables: {
          input: InviteNonMemberFormMapper.toNmUserInput(noumId, values, space),
        },
      });
      onInvite?.();
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    }
  };

  const inviteMemberModalElement = (
    <ChamberInviteModal
      key={getModalKey('invite-members')}
      isOpen={modalType === 'invite-members'}
      onClose={closeModal}
      noumId={noumId ?? ''}
      onInviteMembers={handleInviteMembers}
      onInviteNonMembers={handleInviteNonMembers}
    />
  );

  const approveConnectionRequest = async (connectionRequestId: string) => {
    try {
      if (!connectionRequestId) return;

      await approveRequest({
        variables: {
          connectionRequestId,
        },
      });

      onApproveConnectionRequest?.();
      addSuccessIconToast(
        t('noumena.chamber.accept_connection_request_modal.success_toast'),
      );
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    }
  };

  const rejectConnectionRequest = async (connectionRequestId: string) => {
    try {
      if (!connectionRequestId) return;

      await rejectRequest({
        variables: {
          connectionRequestId,
        },
      });
      onRejectConnectionRequest?.();
      addSuccessIconToast(
        t('noumena.chamber.reject_connection_request_modal.success_toast'),
      );
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    }
  };

  const cancelNoumMemberRolePromotion = async (memberId: string) => {
    try {
      await cancelNoumMemberRolePromotionMutation({
        variables: {
          memberId,
        },
      });
      onRejectConnectionRequest?.();
      addSuccessIconToast(
        t('noumena.chamber.cancel_manager_invitation_modal.success_toast'),
      );
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    }
  };

  const rejectRequestModalElement = (
    <MemberRejectRequestModal
      key={getModalKey('reject-request')}
      isOpen={modalType === 'reject-request'}
      onClose={closeModal}
      onConfirm={() => {
        if (!contextData) return;
        rejectConnectionRequest(contextData[0]._id);
      }}
      members={contextData ?? []}
      isLoading={isChangeRolesLoading}
    />
  );

  const cancelRolePromotionModalElement = (
    <CancelRolePromotionModal
      key={getModalKey('cancel-manager-invite')}
      isOpen={modalType === 'cancel-manager-invite'}
      onClose={closeModal}
      onConfirm={() => {
        if (!contextData) return;
        cancelNoumMemberRolePromotion(contextData[0]._id);
      }}
      isLoading={isChangeRolesLoading}
    />
  );

  return {
    openModal,
    closeModal,
    disconnectModalElement,
    editRoleModalElement,
    inviteMemberModalElement,
    cancelRolePromotionModalElement,
    approveConnectionRequest,
    rejectConnectionRequest,
    rejectRequestModalElement,
  };
}
