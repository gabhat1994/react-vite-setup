import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import { USER_ROLE_HOST } from '@/constants/socialHall';
import { useJoinSocialHallV2Mutation } from '@/apollo/graphql';
import { setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { useSocialHallCallContext } from '@/providers/SocialHallCallProvider';
import { type SocialHallAttendeeFragment } from '@/apollo/graphql/fragments';
import { useSocialHallAgoraSubscription } from './subscription';

export const useInitializeSocialHall = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [socialHallAttendee, setSocialHallAttendee] =
    useState<SocialHallAttendeeFragment>();
  const { rtcEngine } = useSocialHallCallContext();
  const [isInitialized, setIsInitialized] = useState(false);

  const [joinSocialHallMutation] = useJoinSocialHallV2Mutation();

  useSocialHallAgoraSubscription({
    rtmToken: socialHallAttendee?.rtmToken!,
    channelName: socialHallAttendee?.waitingRoomChannelName!,
  });

  const onInitializationFailed = useCallback(
    (socialHallId: string, error: Error) => {
      const { message } = error;
      let localStoragePath = 'event/no-access';
      let navigationPath = ROUTES.EVENT_NO_ACCESS as string;
      // TODO: refactor code with specific error from BE
      const errorMessage = 'Event Not started, Please wait for sometime';

      if (message.toLowerCase() === errorMessage.toLowerCase()) {
        localStoragePath = `event/no-live/${socialHallId}`;
        navigationPath = `/event/no-live/${socialHallId}`;
      }

      setLocalStorage(
        accessLocalStorage.GUEST_REDIRECT_TO_URI,
        localStoragePath,
      );
      navigate(navigationPath);
    },
    [navigate],
  );

  const initializeSocialHall = useCallback(
    async (retryCount: number = 1) => {
      if (retryCount >= 4) {
        return;
      }
      try {
        setIsInitialized(true);
        const { data } = await joinSocialHallMutation({
          variables: {
            name: id,
          },
        });
        if (!data || !data?.joinSocialHallV2) {
          setTimeout(() => {
            initializeSocialHall(retryCount + 1);
          }, retryCount * 1000);
        } else {
          setSocialHallAttendee(data?.joinSocialHallV2);
          rtcEngine?.setClientRole(USER_ROLE_HOST);
        }
      } catch (error) {
        setIsInitialized(false);
        onInitializationFailed(id ?? '', error as Error);
      }
    },
    [joinSocialHallMutation, rtcEngine, onInitializationFailed, id],
  );

  return {
    socialHallAttendee,
    initializeSocialHall,
    isInitialized,
  };
};

export default useInitializeSocialHall;
