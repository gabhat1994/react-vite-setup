import { Header } from '@/components/Header';
import { MainHeader } from '@/layout/MainHeader';
import { breakpoints } from '@/constants/devices';
import ROUTES from '@/constants/routes';
import {
  useMediaDeviceUpdated,
  useMediaPermissionPopup,
} from '@/features/socialHall/hooks';
import { useAuth } from '@/features/auth/contexts';
import { useWindowDimensions } from '@/hooks';
import { Spacer } from '@/layout';
import { useSocialHallCallContext, useSocialHallContext } from '@/providers';
import { type MediaDeviceId } from '@/screens/SocialHall/types';
import { cleanList } from '@/utils/list';
import { SocialHallMediaUtils } from '@/utils/socialHallMedia';
import { UserUtil } from '@/utils/user';
import { type IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { BrowserSupport } from '../BrowserSupport';
import { MediaPermissionNotification } from '../MediaPermissionNotification';
import { AvailableMediaSelection } from './AvailableMediaSelection';
import { MediaContent } from './MediaContent';
import { MediaControlButton } from './MediaControlButton';
import { UserProfilePicture } from './UserProfilePicture';
import { formatAllConnectedDeviceForDropdown } from './helper';
import {
  BannerWrapper,
  Layout,
  MediaWrapper,
  VideoElement,
  VideoWrapper,
  Wrapper,
} from './styles';
import { type MediaAllConnectedDevices, type Track } from './types';

const videoElementId = 'video_element';

export const InitialSettings = () => {
  const navigate = useNavigate();
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const { user, onSetAcceptedSkipMediaTesting } = useAuth();
  const { width } = useWindowDimensions();
  const isMobile = width < breakpoints.TABLET;
  const [videoTrack, setVideoTrack] = useState<MediaStream | null>();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack | null>();
  const [muteAudio, toggleMuteAudio] = useState(false);
  const [muteVideo, toggleMuteVideo] = useState(false);
  const { showPermissionPopup, onBothMediaBlocked, onTogglePopup } =
    useMediaPermissionPopup();

  const cacheDeviceIdRef = useRef<MediaDeviceId>({} as MediaDeviceId);
  const [allConnectedDevices, setAllConnectedDevices] =
    useState<MediaAllConnectedDevices>();
  const {
    deviceId,
    hasAudioPermission,
    hasVideoPermission,
    audioPermissionState,
    videoPermissionState,
    selectDefaultMediaInput,
    showBrowserSupportBanner,
  } = useSocialHallContext();

  const { microphone, speaker, camera } = deviceId || {};

  const { setIsCameraEnable, setCamUsers, onUpdateMuteState } =
    useSocialHallCallContext();

  const initializeDefaultHardware = async () => {
    await SocialHallMediaUtils.askForPermission();
    const devices = await SocialHallMediaUtils.getAllConnectedMedia();
    setAllConnectedDevices(() =>
      formatAllConnectedDeviceForDropdown(
        devices,
        (deviceId || {}) as MediaDeviceId,
      ),
    );
    setTimeout(selectDefaultMediaInput, 500);
  };

  const updateCacheDeviceIdRef = useCallback(
    (media: Partial<MediaDeviceId>) => {
      if (cacheDeviceIdRef.current) {
        cacheDeviceIdRef.current = {
          ...cacheDeviceIdRef.current,
          ...media,
        };
      }
    },
    [],
  );

  const updateVideoTrack = useCallback(() => {
    if (!videoTrack || !videoElementRef.current) return;
    if (!muteVideo) {
      videoElementRef.current.srcObject = videoTrack;
      videoElementRef.current.play();
    } else {
      videoElementRef.current.srcObject = null;
    }
  }, [muteVideo, videoTrack]);

  const onVideoDeviceChange = useCallback(
    async (cameraId: string) => {
      if (videoTrack) {
        videoElementRef.current?.pause();
        setVideoTrack(null);
      }
      if (videoElementRef.current) {
        const track = await SocialHallMediaUtils.handleCameraCheck(cameraId);
        setVideoTrack(track);
      }
    },
    [videoTrack],
  );

  const onToggleAudio = () => {
    if (!hasAudioPermission) {
      onTogglePopup('audio');
    } else {
      toggleMuteAudio((mute) => !mute);
    }
  };

  const onToggleVideo = () => {
    if (!hasVideoPermission) {
      onTogglePopup('video');
    } else if (videoTrack) {
      toggleMuteVideo((mute) => !mute);
    }
  };

  const onReset = () => {
    audioTrack?.close();
    audioTrack?.stop();
    cleanList(videoTrack?.getTracks()).forEach((track) => track?.stop());
    cleanList(tracks).forEach((track) => track?.stop());
    setTracks([]);
  };

  const onJoinSocialHall = async () => {
    if (showLoader) {
      return;
    }
    onReset();
    setIsCameraEnable(!muteVideo);
    if (!muteVideo) {
      setCamUsers([user?._id || '']);
    }
    onUpdateMuteState(muteAudio, user?._id || '');
    // @NOTES: this will automatically close the screen and start the SH visualization
    onSetAcceptedSkipMediaTesting(true);
  };

  const onLeave = () => {
    if (showLoader) {
      return;
    }
    onReset();
    navigate(ROUTES.HOME_NOUM);
  };

  useEffect(() => {
    const handleAudioTrack = async () => {
      if (microphone && cacheDeviceIdRef.current?.microphone !== microphone) {
        updateCacheDeviceIdRef({ microphone });
        const track = await SocialHallMediaUtils.handleMicrophoneCheck(
          microphone,
        );
        setTracks((oldTracks) => [...oldTracks, track] as Track[]);
        setAudioTrack(track);
      }
    };
    handleAudioTrack();
  }, [microphone, hasAudioPermission, updateCacheDeviceIdRef]);

  useEffect(() => {
    if (speaker && cacheDeviceIdRef.current?.speaker !== speaker) {
      updateCacheDeviceIdRef({ speaker });
      SocialHallMediaUtils.handleSpeakerCheck(speaker);
    }
  }, [speaker, updateCacheDeviceIdRef]);

  useLayoutEffect(() => {
    if (
      camera &&
      !cacheDeviceIdRef.current?.camera &&
      videoPermissionState === 'granted'
    ) {
      updateCacheDeviceIdRef({ camera });
      onVideoDeviceChange(camera);
    }
  }, [
    camera,
    onVideoDeviceChange,
    videoPermissionState,
    updateCacheDeviceIdRef,
  ]);

  useEffect(() => {
    updateVideoTrack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muteVideo, videoTrack]);

  useEffect(() => {
    initializeDefaultHardware();
    return () => {
      onReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoPermissionState, audioPermissionState]);

  useMediaDeviceUpdated(initializeDefaultHardware);

  useEffect(() => {
    if (!hasAudioPermission && !hasVideoPermission) {
      onBothMediaBlocked();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAudioPermission, hasVideoPermission]);

  const showLoader = useMemo(() => {
    if (
      hasAudioPermission &&
      !audioTrack &&
      hasVideoPermission &&
      !videoTrack
    ) {
      return true;
    }
    return false;
  }, [hasAudioPermission, hasVideoPermission, audioTrack, videoTrack]);

  const MediaControlResponsiveBtn = () => (
    <MediaControlButton
      isLoading={!videoTrack}
      muteAudio={muteAudio}
      muteVideo={muteVideo}
      hasAudioPermission={!!hasAudioPermission}
      hasVideoPermission={!!hasVideoPermission}
      onToggleAudio={onToggleAudio}
      onToggleVideo={onToggleVideo}
    />
  );

  return (
    <Layout>
      <Header>
        <MainHeader
          avatar={UserUtil.getProfilePicture(user) || undefined}
          userName={user?.firstName || undefined}
        />
      </Header>
      <Wrapper isBannerVisible={showBrowserSupportBanner}>
        <BannerWrapper>
          <BrowserSupport />
        </BannerWrapper>
        <MediaWrapper>
          <VideoWrapper>
            <UserProfilePicture />
            <VideoElement ref={videoElementRef} id={videoElementId} />
            {!isMobile && <MediaControlResponsiveBtn />}
          </VideoWrapper>
          {isMobile && <MediaControlResponsiveBtn />}
          <AvailableMediaSelection
            setTracks={setTracks}
            isMuteAudio={muteAudio}
            isMuteVideo={muteVideo}
            onVideoDeviceChange={onVideoDeviceChange}
            allConnectedDevices={allConnectedDevices}
          />
        </MediaWrapper>
        <Spacer width={48} />
        <MediaContent
          showLoader={showLoader}
          onCompleted={onJoinSocialHall}
          onLeave={onLeave}
        />
        <MediaPermissionNotification
          onTogglePopup={onTogglePopup}
          showAudioModal={showPermissionPopup.audio}
          showVideoModal={showPermissionPopup.video}
        />
      </Wrapper>
    </Layout>
  );
};
