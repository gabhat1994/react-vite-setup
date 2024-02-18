import {
  useSocialHallContext,
  useSocialHallCallContext,
  useSocialHallEventContext,
} from '@/providers';
import {
  useCameraPermissionListener,
  useMicrophonePermissionListener,
  useMediaPermissionPopup,
  useCheckIfEventHasSocialHallAttendees,
} from '@/features/socialHall/hooks';
import { useBreakpoints } from '@/hooks';

import { MuteControl } from './MuteControl';
import { VideoControl } from './VideoControl';
import { ChatControl } from './ChatControl';
import { MemberControl } from './MemberControl';
import { type ControlPanelProps } from './types';
import { CopyLinkControl } from './CopyLinkControl';
import { RaiseHandControl } from './RaiseHandControl';
import { LeaveCallControl } from './LeaveCallControl';
import { FinishEventControl } from './FinishEventControl';
import { MediaSettingControl } from './MediaSettingControl';
import { ScreenSharingControl } from './ScreenSharingControl';
import { ControlPanelWrapper, ControlPanelMainContainer } from './styles';
import { MediaPermissionNotification } from '../MediaPermissionNotification';

export const ControlPanel = ({
  onToggleChat,
  onToggleMember,
  isNewMessage,
  showChatPanel,
  isReconnecting,
  showMembersPanel,
}: ControlPanelProps) => {
  const [hasVideoPermission] = useCameraPermissionListener();
  const [hasAudioPermission] = useMicrophonePermissionListener();
  const { onTogglePopup, showPermissionPopup } = useMediaPermissionPopup();

  const {
    isMuted,
    toggleCamera,
    toggleMuteCall,
    isCameraEnable,
    localVideoTrack,
  } = useSocialHallCallContext();
  const {
    isMainEvent,
    isEventHost,
    isPreEvent,
    isPostEvent,
    eventDetails,
    isEventSpeaker,
  } = useSocialHallEventContext();
  const { isMobile } = useBreakpoints();
  const { socialHallAttendeesAndGroups, activeSocialHallGroup } =
    useSocialHallContext();

  const hasSocialHallAttendees = useCheckIfEventHasSocialHallAttendees(
    socialHallAttendeesAndGroups,
    activeSocialHallGroup,
  );

  const isNotAMainEvent = isPostEvent || isPreEvent;

  const isMainEventSpeaker = isMainEvent && (isEventHost || isEventSpeaker);

  const isMainEventAudience = isMainEvent && !isEventHost && !isEventSpeaker;

  const hasPublishingMediaPermission = isMainEventSpeaker || isNotAMainEvent;

  const isShowRaiseHandControl = isMainEventAudience || isNotAMainEvent;

  const showLeaveEventBtn = !isMainEvent && !isEventHost && !isMobile;

  const showEndEventBtn =
    (isMainEvent || eventDetails?.isInstantEvent) &&
    isEventHost &&
    eventDetails?.isInstantEvent &&
    !isMobile;

  const showMemberControl = isMainEvent || eventDetails?.isInstantEvent;

  const onToggleMuteCall = () => {
    if (hasAudioPermission) {
      toggleMuteCall();
    } else {
      onTogglePopup('audio');
    }
  };

  const onToggleCamera = () => {
    if (hasVideoPermission) {
      toggleCamera();
    } else {
      onTogglePopup('video');
    }
  };

  return (
    <>
      <ControlPanelWrapper
        data-testid="control_panel_wrapper"
        aria-disabled={isReconnecting}
        disabled={isReconnecting}
      >
        {!isMobile && <MediaSettingControl />}
        <ControlPanelMainContainer>
          {hasPublishingMediaPermission && (
            <>
              <MuteControl
                isMuted={isMuted}
                onToggle={onToggleMuteCall}
                isError={!hasAudioPermission}
              />
              <VideoControl
                onToggle={onToggleCamera}
                isError={!hasVideoPermission}
                isCameraEnable={isCameraEnable}
                isLoading={
                  isCameraEnable &&
                  localVideoTrack?.isPlaying === undefined &&
                  !!hasVideoPermission
                }
              />
              {!isMobile && <ScreenSharingControl />}
            </>
          )}

          {isShowRaiseHandControl && <RaiseHandControl />}
          {!hasSocialHallAttendees && (
            <ChatControl
              onToggleChat={onToggleChat}
              isNewMessage={isNewMessage}
              showChatPanel={showChatPanel}
            />
          )}
          {showMemberControl && (
            <MemberControl
              onToggleMemberPanel={onToggleMember}
              showMembersPanel={showMembersPanel}
            />
          )}
          <CopyLinkControl />
        </ControlPanelMainContainer>

        {showLeaveEventBtn && <LeaveCallControl />}

        {showEndEventBtn && <FinishEventControl />}
      </ControlPanelWrapper>

      <MediaPermissionNotification
        onTogglePopup={onTogglePopup}
        showAudioModal={showPermissionPopup.audio}
        showVideoModal={showPermissionPopup.video}
      />
    </>
  );
};
