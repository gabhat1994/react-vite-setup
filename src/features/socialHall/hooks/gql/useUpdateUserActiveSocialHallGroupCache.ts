import { useCallback, useEffect, useRef } from 'react';
import { type SocialGroup, type UserOutput } from '@/apollo/generated/types';
import { SocialHallUtils } from '@/utils/socialHall';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { useUserActiveSocialHallGroupCache } from './useUserActiveSocialHallGroupCache';

export const useUpdateUserActiveSocialHallGroupCache = () => {
  const { activeSocialHallGroup } = useSocialHallContext();
  const activeSocialHallGroupRef = useRef<SocialGroup>();
  const [updateActiveSocialHallGroupCache] =
    useUserActiveSocialHallGroupCache();

  const updateRaiseHandUsersCache = useCallback(
    (isRaiseHand: boolean, userId: string) => {
      const raisedHandUsers =
        activeSocialHallGroupRef.current?.raiseHands || [];
      const raiseHands = !isRaiseHand
        ? raisedHandUsers?.filter((id) => id !== userId)
        : [...raisedHandUsers, userId];

      updateActiveSocialHallGroupCache({
        ...activeSocialHallGroupRef.current,
        raiseHands,
      } as SocialGroup);
    },
    [updateActiveSocialHallGroupCache],
  );

  const updateNewAttendeeOnCallCache = useCallback(
    (user: UserOutput) => {
      const users = SocialHallUtils.mergeUserData(
        activeSocialHallGroupRef.current?.users as UserOutput[],
        user,
      );
      updateActiveSocialHallGroupCache({
        ...activeSocialHallGroupRef.current,
        users,
      } as SocialGroup);
    },
    [updateActiveSocialHallGroupCache],
  );

  const updateGroupName = useCallback(
    (groupName: string) => {
      updateActiveSocialHallGroupCache({
        ...activeSocialHallGroupRef.current,
        name: groupName,
      } as SocialGroup);
    },
    [updateActiveSocialHallGroupCache],
  );

  const updateMutedUserCache = useCallback(
    (userId: string, isMuted: boolean) => {
      const mutedSpeakers =
        activeSocialHallGroupRef.current?.mutedSpeakers || [];
      updateActiveSocialHallGroupCache({
        ...activeSocialHallGroupRef.current,
        mutedSpeakers: isMuted
          ? [...mutedSpeakers, userId]
          : mutedSpeakers?.filter((id) => id !== userId),
      } as SocialGroup);
    },
    [updateActiveSocialHallGroupCache],
  );

  const removeAttendeeFromCallCache = useCallback(
    (memberId: string) => {
      const users = activeSocialHallGroupRef.current?.users?.filter(
        (user) => user?._id !== memberId,
      );
      updateActiveSocialHallGroupCache({
        ...activeSocialHallGroupRef.current,
        users,
      } as SocialGroup);
    },
    [updateActiveSocialHallGroupCache],
  );

  useEffect(() => {
    activeSocialHallGroupRef.current = (activeSocialHallGroup ||
      []) as SocialGroup;
  }, [activeSocialHallGroup]);

  return {
    updateGroupName,
    updateMutedUserCache,
    updateRaiseHandUsersCache,
    updateNewAttendeeOnCallCache,
    removeAttendeeFromCallCache,
  };
};
