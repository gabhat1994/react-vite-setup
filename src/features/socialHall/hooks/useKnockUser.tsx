import { useState } from 'react';
import { useError } from '@/hooks/useError';
import {
  useAcceptKnockMutation,
  useCancelKnockMutation,
  useDeclineKnockMutation,
  useJoinGroupWithoutKnockingMutation,
  useKnockMutation,
} from '@/apollo/graphql';
import { type Maybe } from '@/apollo/generated/types';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { useRefreshKnocks } from './useRefreshKnocks';

export const useKnockUser = () => {
  const { logError } = useError();
  const [knockMutation] = useKnockMutation();
  const {
    refreshVisualization,
    userActiveGroupData,
    socialHallAttendeesAndGroups,
  } = useSocialHallContext();
  const { refreshOwnKnocks, refreshActiveKnocks } = useRefreshKnocks();

  const [acceptKnockMutation] = useAcceptKnockMutation();
  const [cancelKnockMutation] = useCancelKnockMutation();
  const [declineKnockMutation] = useDeclineKnockMutation();
  const [joinGroupWithoutKnocking, { loading: joiningGroupAsHost }] =
    useJoinGroupWithoutKnockingMutation();

  const [knockLoading, setKnockLoading] = useState<boolean>(false);
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false);
  const [declineLoading, setDeclineLoading] = useState<boolean>(false);

  const knockUser = async (
    hallAttendeeId?: Maybe<string>,
    groupId?: Maybe<string>,
    knockMessage?: string,
  ) => {
    if (groupId || hallAttendeeId) {
      try {
        setKnockLoading(true);
        await knockMutation({
          variables: {
            hallAttendeeId,
            groupId,
            knockMessage,
          },
        });
        refreshOwnKnocks();
      } catch (err) {
        logError(err, '');
      } finally {
        setKnockLoading(false);
      }
    }
  };

  const acceptKnock = async (knockId: string) => {
    try {
      setAcceptLoading(true);
      await acceptKnockMutation({ variables: { knockId } });
      await refreshActiveKnocks();
      await refreshVisualization();
    } catch (e) {
      logError(e, '');
    } finally {
      setAcceptLoading(false);
    }
  };

  // Method to decline someone else knocks
  const declineKnock = async (knockId: string) => {
    try {
      setDeclineLoading(true);
      await declineKnockMutation({ variables: { knockId } });
      await refreshActiveKnocks();
    } catch (e) {
      logError(e, '');
    } finally {
      setDeclineLoading(false);
    }
  };

  // Method to cancel my knock
  const cancelKnock = async (knockId: string) => {
    try {
      setDeclineLoading(true);
      await cancelKnockMutation({ variables: { knockId } });
      await refreshOwnKnocks();
    } catch (e) {
      logError(e, '');
    } finally {
      setDeclineLoading(false);
    }
  };

  // Join to a group as host
  const joinGroupAsHost = async (groupId: string) => {
    try {
      await joinGroupWithoutKnocking({
        variables: { groupId },
        onCompleted: () => {
          userActiveGroupData?.refetch();
          socialHallAttendeesAndGroups?.refetch();
        },
      });
    } catch (e) {
      logError(e, '');
    }
  };

  return {
    knockUser,
    cancelKnock,
    acceptKnock,
    declineKnock,
    joinGroupAsHost,
    knockLoading,
    acceptLoading,
    declineLoading,
    joiningGroupAsHost,
  };
};

export default useKnockUser;
