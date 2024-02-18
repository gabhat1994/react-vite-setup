import { useCallback, useMemo } from 'react';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { Stack } from '@/layout';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { useSocialHallCallContext, useSocialHallContext } from '@/providers';
import { useSpeakerView } from '@/features/socialHall/hooks';
import { SocialHallUtils } from '@/utils/socialHall';
import { type ScreenShareProps } from './types';
import {
  CloseFullScreenButton,
  ControlIconWrapper,
  FullScreenButton,
  PinedFrame,
  PinnedFrameWrapper,
  ScreenShareWarpper,
  ScreenSharingLabel,
  StopSharing,
} from './styles';

interface HTMLElement {
  webkitRequestFullScreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
  requestFullscreen?: () => Promise<void>;
}

export const ScreenShare = ({
  isFullScreen,
  fullScreenElemId,
  screenShareElemId,
  clientHeight,
  clientWidth,
  showChatPanel,
  showMembersPanel,
}: ScreenShareProps) => {
  const { activeSocialHallGroup, onCloseFullScreen } = useSocialHallContext();
  const {
    isShareScreen,
    onToggleScreenSharing,
    screenSharingLocalUserFeed,
    screenSharingRemoteUserFeed,
  } = useSocialHallCallContext();

  const onClickShareScreen = useCallback(() => {
    const el = document.getElementById(fullScreenElemId) as HTMLElement;
    // Disable fullscreen mode for user who is sharing screen
    if (screenSharingLocalUserFeed) {
      return;
    }

    const rfs =
      el?.requestFullscreen ||
      el?.webkitRequestFullScreen ||
      el?.mozRequestFullScreen ||
      el?.msRequestFullscreen;
    rfs?.call(el);
  }, [screenSharingLocalUserFeed, fullScreenElemId]);

  const onMaximizeScreenShare = useCallback(() => {
    const el = document.getElementById(fullScreenElemId) as HTMLElement;
    if (el?.requestFullscreen) {
      el?.requestFullscreen();
    }
  }, [fullScreenElemId]);

  const { elemRef, maxHeight, dimension } = useSpeakerView({
    clientHeight,
    clientWidth,
    showChatPanel,
    showMembersPanel,
  });

  const screenSharingUserName = useMemo(() => {
    if (screenSharingRemoteUserFeed?.uid) {
      const uid = SocialHallUtils.cleanScreenSharingUid(
        screenSharingRemoteUserFeed?.uid,
      );
      return activeSocialHallGroup?.users?.find((user) => user?._id === uid)
        ?.firstName;
    }
    return '';
  }, [activeSocialHallGroup?.users, screenSharingRemoteUserFeed?.uid]);

  const screenSharei18Key = useMemo(() => {
    if (isShareScreen) {
      return 'noumena.social_hall.screen_sharing_current_user';
    }
    return 'noumena.social_hall.screen_sharing_remote_user';
  }, [isShareScreen]);

  return (
    <Stack vertical fullWidth align="center">
      <ScreenSharingLabel>
        <Trans
          i18nKey={screenSharei18Key}
          values={{ firstName: screenSharingUserName }}
          components={{
            b: <b />,
          }}
        />
      </ScreenSharingLabel>
      <ScreenShareWarpper
        ref={elemRef}
        style={{
          maxHeight: `${isFullScreen ? 'none' : maxHeight}`,
          minWidth: `${!isFullScreen && clientWidth - 368}`,
        }}
      >
        {isFullScreen && (
          <CloseFullScreenButton onClick={onCloseFullScreen}>
            <Icon
              name="close_m"
              size={24}
              color="--icon-button-neutral-alt-default"
            />
          </CloseFullScreenButton>
        )}
        <PinnedFrameWrapper
          isFullScreen={isFullScreen}
          isShareUserFeed={!!screenSharingLocalUserFeed}
          id="screenShareWrapper"
        >
          <StopSharing
            style={{
              maxWidth: `${isFullScreen ? 'none' : dimension.width - 115}px`,
              maxHeight: `${isFullScreen ? 'none' : dimension.height - 115}px`,
              minWidth: `${isFullScreen ? 'none' : dimension.width - 115}px`,
              minHeight: `${isFullScreen ? 'none' : dimension.height - 115}px`,
            }}
          >
            <Stack vertical gap={8} align="center">
              <ControlIconWrapper
                cursorAllowed
                onClick={() => onToggleScreenSharing()}
              >
                <Icon
                  name="share_content_off_m"
                  size={24}
                  color="--icon-button-neutral-default"
                />
              </ControlIconWrapper>
              <TSpan font="body-m-bold" colorToken="--color-base-gray-100">
                {t('noumena.social_hall.stop_sharing_screen')}
              </TSpan>
            </Stack>
          </StopSharing>
          <FullScreenButton
            isShareUserFeed={!screenSharingLocalUserFeed && !isFullScreen}
            onClick={onMaximizeScreenShare}
          >
            <Icon
              name="fullscreen_xs"
              size={24}
              color="--icon-call-ui-neutral-alt-default"
            />
          </FullScreenButton>
          <PinedFrame
            isFullScreen={isFullScreen}
            id={screenShareElemId}
            onClick={onClickShareScreen}
            style={{
              maxWidth: `${
                isFullScreen ? 'none' : `${dimension.width - 115}px`
              }`,
              maxHeight: `${
                isFullScreen ? 'none' : `${dimension.height - 115}px`
              }`,
              minWidth: `${
                isFullScreen ? 'none' : `${dimension.width - 115}px`
              }`,
              minHeight: `${
                isFullScreen ? 'none' : `${dimension.height - 115}px`
              }`,
            }}
          />
        </PinnedFrameWrapper>
      </ScreenShareWarpper>
    </Stack>
  );
};
export default ScreenShare;
