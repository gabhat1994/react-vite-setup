import {
  useApproveNoumInvitationMutation,
  useApproveNoumMemberRolePromotionMutation,
  useRejectNoumInvitationMutation,
  useRejectNoumMemberRolePromotionMutation,
} from '@/apollo/graphql';
import { useCallback } from 'react';
import { type Maybe } from '@/common/types';
import { type NotificationFragment } from '@/apollo/graphql/fragments';
import { type UseMemberInvitationNotificationHandlersOptions } from './types';

export function useMemberInvitationNotificationHandlers({
  onNotificationRead,
}: UseMemberInvitationNotificationHandlersOptions) {
  const [approveNoumInvitation] = useApproveNoumInvitationMutation();
  const [rejectNoumInvitation] = useRejectNoumInvitationMutation();
  const [approveNoumMemberRolePromotionMutation] =
    useApproveNoumMemberRolePromotionMutation();

  const [rejectNoumMemberRolePromotionMutation] =
    useRejectNoumMemberRolePromotionMutation();

  const acceptRolePromotion = useCallback(
    async (notification: NotificationFragment, noumId: Maybe<string>) => {
      if (!noumId) {
        return;
      }
      await approveNoumMemberRolePromotionMutation({
        variables: {
          noumId,
        },
      });
      await onNotificationRead(notification);
    },
    [approveNoumMemberRolePromotionMutation, onNotificationRead],
  );

  const rejectRolePromotion = useCallback(
    async (notification: NotificationFragment, noumId: Maybe<string>) => {
      if (!noumId) {
        return;
      }
      await rejectNoumMemberRolePromotionMutation({
        variables: {
          noumId,
        },
      });
      await onNotificationRead(notification);
    },
    [rejectNoumMemberRolePromotionMutation, onNotificationRead],
  );

  const acceptInvitation = useCallback(
    async (notification: NotificationFragment, noumId: Maybe<string>) => {
      if (!noumId) {
        return;
      }
      await approveNoumInvitation({
        variables: {
          noumId,
        },
      });
      await onNotificationRead(notification);
    },
    [approveNoumInvitation, onNotificationRead],
  );

  const rejectInvitation = useCallback(
    async (notification: NotificationFragment, noumId: Maybe<string>) => {
      if (!noumId) {
        return;
      }

      await rejectNoumInvitation({
        variables: { noumId },
      });
      await onNotificationRead(notification);
    },
    [onNotificationRead, rejectNoumInvitation],
  );

  return {
    acceptInvitation,
    rejectInvitation,
    acceptRolePromotion,
    rejectRolePromotion,
  };
}
