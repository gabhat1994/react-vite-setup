import {
  type UserBasicOutputFragment,
  useApproveNoumInvitationMutation,
  useRejectNoumInvitationMutation,
  type SpaceOutputFragment,
  useApproveNoumMemberRolePromotionMutation,
  useRejectNoumMemberRolePromotionMutation,
} from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { useToast } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { AcceptManagerRoleModal } from '../../components/AcceptManagerRoleModal';
import { DeclineManagerRoleModal } from '../../components/DeclineManagerRoleModal';

type ModalType = 'accept-manager-role' | 'decline-manager-role';

interface UseManagerInvitationActionsOptions {
  noum?: Maybe<Pick<SpaceOutputFragment, '_id' | 'name'>>;
  invitationSentFrom: Maybe<UserBasicOutputFragment>;
  isManagerInvitation?: boolean;
  isRolePromotion?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}

export function useManagerInvitationActions({
  noum,
  invitationSentFrom,
  isManagerInvitation,
  isRolePromotion,
  onApprove,
  onReject,
}: UseManagerInvitationActionsOptions) {
  const { addErrorToast } = useToast();
  const { openModal, closeModal, modalType } = useModalManager<ModalType>();

  const [approveNoumInvitationMutation, { loading: approveInvitationLoading }] =
    useApproveNoumInvitationMutation();
  const [rejectNoumInvitationMutation, { loading: rejectInvitationLoading }] =
    useRejectNoumInvitationMutation();

  const [
    approveNoumMemberRolePromotionMutation,
    { loading: approvePromotionLoading },
  ] = useApproveNoumMemberRolePromotionMutation();

  const [
    rejectNoumMemberRolePromotionMutation,
    { loading: rejectPromotionLoading },
  ] = useRejectNoumMemberRolePromotionMutation();

  const handleAcceptInvitation = () => {
    if (isManagerInvitation || isRolePromotion) {
      openModal('accept-manager-role');
    } else {
      handleApprove();
    }
  };

  const handleApprove = async () => {
    if (!noum?._id) {
      return;
    }

    try {
      if (isRolePromotion) {
        await approveNoumMemberRolePromotionMutation({
          variables: {
            noumId: noum?._id,
          },
        });
      } else {
        await approveNoumInvitationMutation({
          variables: {
            noumId: noum?._id,
          },
        });
      }

      closeModal();
      await onApprove?.();
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    } finally {
      closeModal();
    }
  };

  const handleReject = async () => {
    if (!noum?._id) {
      return;
    }

    try {
      if (isRolePromotion) {
        await rejectNoumMemberRolePromotionMutation({
          variables: {
            noumId: noum?._id,
          },
        });
      } else {
        await rejectNoumInvitationMutation({
          variables: {
            noumId: noum?._id,
          },
        });
      }

      await onReject?.();
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    } finally {
      closeModal();
    }
  };

  const acceptInvitationModalElement = (
    <AcceptManagerRoleModal
      isOpen={modalType === 'accept-manager-role'}
      onClose={closeModal}
      invitationSentFrom={invitationSentFrom}
      noum={noum}
      loading={approveInvitationLoading || approvePromotionLoading}
      onConfirm={handleApprove}
    />
  );

  const rejectInvitationModalElement = (
    <DeclineManagerRoleModal
      isOpen={modalType === 'decline-manager-role'}
      onClose={closeModal}
      loading={rejectInvitationLoading || rejectPromotionLoading}
      noumName={noum?.name ?? ''}
      onConfirm={handleReject}
    />
  );

  return {
    openModal,
    handleAcceptInvitation,
    approveInvitationLoading:
      approvePromotionLoading || approveInvitationLoading,
    rejectInvitationLoading: rejectPromotionLoading || rejectInvitationLoading,
    acceptInvitationModalElement,
    rejectInvitationModalElement,
  };
}
