import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';

import {
  useSocialHallAttendeesAndGroupsQuery,
  useUserActiveSocialHallGroupQuery,
} from '@/apollo/graphql';
import {
  useCameraPermissionListener,
  useInitializeSocialHall,
  useMicrophonePermissionListener,
  useSocialHallEvent,
} from '@/features/socialHall/hooks';
import {
  type Document,
  type ISocialHallContext,
  type MediaDeviceId,
} from '@/screens/SocialHall/types';
import { useAuth } from '@/features/auth/contexts';
import { useEventAttendees } from '@/features/events/hooks';
import { SocialHallMediaUtils } from '@/utils/socialHallMedia';
import { isChromeOrFirefox, isMobileDevice } from '@/utils/browserDetect';
import { SocialHallContextInitialValue } from '@/screens/SocialHall/const';
import { usePersonalSHId } from '@/features/socialHall/hooks/usePersonalSHId';
import { type MediaVirtualBackground } from '@/features/socialHall/components';
import { cleanList } from '@/utils/list';

export const SocialHallContext = createContext<ISocialHallContext>(
  SocialHallContextInitialValue,
);

const SocialHallProviderInner: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAcceptedSkipMediaTesting } = useAuth();
  const [deviceId, setDeviceId] = useState<MediaDeviceId>();
  const [virtualBackground, setVirtualBackground] =
    useState<MediaVirtualBackground | null>(
      SocialHallMediaUtils.getAllVirtualBackground()[0],
    );
  const { initializeSocialHall, socialHallAttendee, isInitialized } =
    useInitializeSocialHall();
  // @TODO: revert this once NOUM-5624 is completed
  const [showBuzzRoom, setShowBuzzRoom] = useState(true);
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [showBrowserSupportBanner, setShowBrowserSupportBanner] =
    useState<boolean>(false);
  const [hasVideoPermission, videoPermissionState] =
    useCameraPermissionListener();
  const [hasAudioPermission, audioPermissionState] =
    useMicrophonePermissionListener();

  const [askHandsUpOnce, setAskHandsUpOnce] = useState<boolean>(false);
  const [isBlockNavigate, setIsBlockNavigate] = useState<boolean>(true);

  const { eventDetails, isWaitingForHost } = useSocialHallEvent();

  const personalSocialHallId = usePersonalSHId();

  const skipApiCalls =
    !socialHallAttendee?._id || (!personalSocialHallId && !eventDetails?._id);

  const userActiveGroupQuery = useUserActiveSocialHallGroupQuery({
    variables: {
      socialHallId: socialHallAttendee?.socialHallId,
    },
    skip: skipApiCalls,
  });

  const socialHallAttendeesAndGroupsQuery =
    useSocialHallAttendeesAndGroupsQuery({
      nextFetchPolicy: 'cache-and-network',
      variables: {
        limit: 100,
        offset: 0,
        socialHallId: socialHallAttendee?.socialHallId ?? '',
      },
      skip: skipApiCalls,
    });

  const activeSocialHallGroup =
    userActiveGroupQuery?.data?.userActiveSocialHallGroup;

  const isHost = useMemo(
    () => !!activeSocialHallGroup?.hosts?.some((item) => item === user?._id),
    [activeSocialHallGroup?.hosts, user?._id],
  );

  const { refetchAudience } = useEventAttendees({
    eventId: eventDetails?._id || '',
    isHost: Boolean(isHost),
    shouldFetch: false,
  });

  const stageAttendees = useMemo(
    () =>
      cleanList(
        activeSocialHallGroup?.users?.filter((activeUser) =>
          activeSocialHallGroup?.speakers?.includes(activeUser?._id!),
        ),
      ),
    [activeSocialHallGroup],
  );

  const audienceAttendees = useMemo(
    () =>
      cleanList(
        activeSocialHallGroup?.users?.filter(
          (activeUser) =>
            !activeSocialHallGroup?.hosts?.includes(activeUser?._id!) &&
            !activeSocialHallGroup?.speakers?.includes(activeUser?._id!),
        ),
      ),
    [activeSocialHallGroup],
  );

  const speakerInvitation = useMemo(
    () =>
      activeSocialHallGroup?.invitedAsSpeakers?.find(
        (speaker) =>
          speaker?.invitee?._id === user?._id ||
          speaker?.inviter?._id === user?._id,
      ),
    [activeSocialHallGroup?.invitedAsSpeakers, user?._id],
  );

  const selectDefaultMediaInput = useCallback(async () => {
    const { microphoneDeviceId, cameraDeviceId, speakerDeviceId } =
      await SocialHallMediaUtils.getDefaultMediaDeviceId();

    setDeviceId({
      camera: cameraDeviceId,
      microphone: microphoneDeviceId,
      speaker: speakerDeviceId,
    });
  }, []);

  const onCloseFullScreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as Document)?.webkitExitFullscreen) {
      (document as Document)?.webkitExitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    if (isAcceptedSkipMediaTesting && !isWaitingForHost && !isInitialized) {
      initializeSocialHall();
    }
  }, [
    initializeSocialHall,
    isAcceptedSkipMediaTesting,
    isInitialized,
    isWaitingForHost,
  ]);

  useEffect(() => {
    if (isAcceptedSkipMediaTesting) {
      selectDefaultMediaInput();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    setTimeout(() => {
      setShowBrowserSupportBanner(!isChromeOrFirefox() && !isMobileDevice());
    }, 2000);
  }, []);

  const value: ISocialHallContext = useMemo(
    () => ({
      isHost,
      deviceId,
      setDeviceId,
      isGridLayout,
      showBuzzRoom,
      stageAttendees,
      askHandsUpOnce,
      setShowBuzzRoom,
      isBlockNavigate,
      refetchAudience,
      isWaitingForHost,
      audienceAttendees,
      setAskHandsUpOnce,
      speakerInvitation,
      virtualBackground,
      socialHallAttendee,
      hasVideoPermission,
      hasAudioPermission,
      onCloseFullScreen,
      setIsBlockNavigate,
      videoPermissionState,
      audioPermissionState,
      setVirtualBackground,
      activeSocialHallGroup,
      selectDefaultMediaInput,
      showBrowserSupportBanner,
      setShowBrowserSupportBanner,
      eventId: eventDetails?._id || '',
      onSwitchLayout: setIsGridLayout,
      groupId: activeSocialHallGroup?._id,
      userActiveGroupData: userActiveGroupQuery,
      groupName: activeSocialHallGroup?.name ?? '',
      isPersonalSocialHall: !!personalSocialHallId,
      socialHallId: socialHallAttendee?.socialHallId ?? '',
      socialHallAttendeesAndGroups: socialHallAttendeesAndGroupsQuery,
      refreshVisualization: socialHallAttendeesAndGroupsQuery.refetch,
    }),
    [
      isHost,
      deviceId,
      isGridLayout,
      showBuzzRoom,
      stageAttendees,
      askHandsUpOnce,
      isBlockNavigate,
      refetchAudience,
      isWaitingForHost,
      onCloseFullScreen,
      audienceAttendees,
      speakerInvitation,
      virtualBackground,
      socialHallAttendee,
      eventDetails?._id,
      hasVideoPermission,
      hasAudioPermission,
      userActiveGroupQuery,
      videoPermissionState,
      audioPermissionState,
      personalSocialHallId,
      setVirtualBackground,
      activeSocialHallGroup,
      selectDefaultMediaInput,
      showBrowserSupportBanner,
      socialHallAttendeesAndGroupsQuery,
    ],
  );

  return (
    <SocialHallContext.Provider value={value}>
      {children}
    </SocialHallContext.Provider>
  );
};

export const useSocialHallContext = () => useContext(SocialHallContext);

export const SocialHallProvider = memo(SocialHallProviderInner);
