import {
  useApproveNoumInvitationMutation,
  useRejectNoumInvitationMutation,
  useApproveConnectionRequestMutation,
  useRejectConnectionRequestMutation,
  useCancelNoumInvitationMutation,
} from '@/apollo/graphql';
import { useToast } from '@/hooks';
import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';

export function useRequestInvitationActions() {
  const { addErrorToast } = useToast();

  const [approveRequest, { loading: acceptRequestLoader }] =
    useApproveConnectionRequestMutation();
  const [declineRequest, { loading: declineRequestLoader }] =
    useRejectConnectionRequestMutation();
  const [
    cancelNoumRequestInvitation,
    { loading: cancelNoumRequestInvitationLoader },
  ] = useCancelNoumInvitationMutation();
  const [approveNoumInvitationMutation, { loading: approveInvitationLoading }] =
    useApproveNoumInvitationMutation();
  const [declineNoumInvitationMutation, { loading: declineInvitationLoading }] =
    useRejectNoumInvitationMutation();

  const loader =
    acceptRequestLoader ||
    declineRequestLoader ||
    cancelNoumRequestInvitationLoader ||
    approveInvitationLoading ||
    declineInvitationLoading;

  const actionHanlder = async (
    actionType: ConnectionRequestTypeEnum,
    isInvite: boolean,
    memberId: string,
    noumId: string,
  ) => {
    try {
      switch (actionType) {
        case ConnectionRequestTypeEnum.Approved:
          if (isInvite) {
            await approveNoumInvitationMutation({
              variables: {
                noumId,
              },
            });
          } else {
            await approveRequest({
              variables: {
                connectionRequestId: memberId,
              },
            });
          }
          break;
        case ConnectionRequestTypeEnum.Declined:
          if (isInvite) {
            await declineNoumInvitationMutation({
              variables: {
                noumId,
              },
            });
          } else {
            await declineRequest({
              variables: {
                connectionRequestId: memberId,
              },
            });
          }
          break;

        default:
          await cancelNoumRequestInvitation({
            variables: {
              memberId,
            },
          });
          break;
      }
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    }
  };

  return {
    actionHanlder,
    loader,
  };
}
