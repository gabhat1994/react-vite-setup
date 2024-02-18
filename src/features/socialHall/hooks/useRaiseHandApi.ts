import { useMemo } from 'react';
import {
  useAcceptRaiseHandRequestMutation,
  useCancelRaiseHandByGroupIdMutation,
  useDeclineRaiseHandByGroupIdMutation,
  useRaiseHandByGroupIdMutation,
} from '@/apollo/graphql';
import { useError } from '@/hooks/useError';
import { useSocialHallContext } from '@/providers/SocialHallProvider';

export const useRaiseHandApi = () => {
  const { userActiveGroupData } = useSocialHallContext();
  const { logError } = useError();

  const userActiveSocialHallGroup = useMemo(
    () => userActiveGroupData?.data?.userActiveSocialHallGroup,
    [userActiveGroupData],
  );

  const [raisedHandMutation] = useRaiseHandByGroupIdMutation({
    variables: {
      groupId: userActiveSocialHallGroup?._id!,
    },
  });

  const [cancelRaiseHandMutation] = useCancelRaiseHandByGroupIdMutation({
    variables: {
      groupId: userActiveSocialHallGroup?._id!,
    },
  });

  const [declineRaiseHandByGroupId] = useDeclineRaiseHandByGroupIdMutation();

  const [acceptRaiseHandRequest] = useAcceptRaiseHandRequestMutation();

  const onCancelRaiseHand = async () => {
    try {
      await cancelRaiseHandMutation({
        variables: {
          groupId: userActiveSocialHallGroup?._id!,
        },
      });
    } catch (err) {
      logError(err, '');
    }
  };

  const onDeclineRaiseHand = async (requestedByUserId: string) => {
    try {
      await declineRaiseHandByGroupId({
        variables: {
          requestedByUserId,
          groupId: userActiveSocialHallGroup?._id!,
        },
      });
    } catch (err) {
      logError(err, '');
    }
  };

  const onAcceptRaiseHand = async (requestedByUserId: string) => {
    try {
      await acceptRaiseHandRequest({
        variables: {
          requestedByUserId,
          groupId: userActiveSocialHallGroup?._id!,
        },
      });
    } catch (err) {
      logError(err, '');
    }
  };

  const onRaiseHand = async () => {
    try {
      await raisedHandMutation({
        variables: {
          groupId: userActiveSocialHallGroup?._id!,
        },
      });
    } catch (err) {
      logError(err, '');
    }
  };

  const toggleRaisedHand = (isRaiseHand: boolean, userId: string) => {
    if (!userId) {
      return;
    }
    if (isRaiseHand) {
      onRaiseHand();
    } else {
      onCancelRaiseHand();
    }
  };

  return {
    onRaiseHand,
    toggleRaisedHand,
    onCancelRaiseHand,
    onAcceptRaiseHand,
    onDeclineRaiseHand,
    declineRaiseHandByGroupId,
  };
};

export default useRaiseHandApi;
