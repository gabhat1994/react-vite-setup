import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { sizes } from '@/constants/devices';
import { noScrollBar } from '@/common/globalStyles';

export const Wrapper = styled.div<{ showRaiseHand?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: var(--bg-card-neutral-alt-default);
  @media (max-width: ${sizes.TABLET_L}) {
    flex-direction: ${({ showRaiseHand }) =>
      showRaiseHand ? 'row-reverse' : 'row'};
    justify-content: center;
  }
`;

export const MainViewWrapper = styled.div<{ isMainEvent?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: ${({ isMainEvent }) =>
    isMainEvent ? 'flex-start' : 'center'};
  padding: 24px 0;
`;

export const BuzzRoomUsersContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BuzzRoomUsersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 368px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding-top: 120px;
  }
`;

export const MainEventUserWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  max-width: 368px;
`;

export const StageUserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const StageHeader = styled(TSpan)<{ screenSharing?: boolean }>`
  padding-top: 16px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding-top: ${({ screenSharing }) => (screenSharing ? '16px' : '120px')};
  }
`;

export const AttendeeHeader = styled(TSpan)`
  padding-top: 16px;
`;

export const ScreenShareWrapper = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding-top: 120px;
  }
`;

export const ScreenShareTitleSpan = styled(TSpan)``;
export const ScreenShareNameSpan = styled(TSpan)``;

export const CloseIconButton = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background-color: var(--bg-button-neutral-default);
  cursor: pointer;
  z-index: 10;
  @media (max-width: ${sizes.TABLET_L}) {
    top: 16px;
    right: 16px;
  }
`;

export const FullScreenWrapper = styled.div`
  z-index: 10;
`;

export const ScreenSharingElement = styled.div<{ isFullScreen?: boolean }>`
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  video {
    border-radius: ${({ isFullScreen }) => (isFullScreen ? '0px' : '12px')};
  }
  @media (max-width: ${sizes.TABLET_L}) {
    width: 368px;
    height: 220px;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 343px;
    height: 220px;
    max-width: calc(100vw - 32px);
  }
  width: ${({ isFullScreen }) => (isFullScreen ? '100vw' : '394px')};
  height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : '220px')};
  border: ${({ isFullScreen }) =>
    isFullScreen
      ? '2px solid var(--border-button-brand-primary-default)'
      : 'none'};
`;

export const ScrollViewWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding-bottom: 186px;
  ${noScrollBar}
`;

export const ControllerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 186px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 1.34%,
    var(--gradient-base-overlay-default) 44%
  );
  z-index: 3;
`;

export const KnockNotificationWrapper = styled.div`
  width: 356px;
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  @media (max-width: ${sizes.MOBILE_M}) {
    width: calc(100% - 32px);
  }
`;

export const TempChatContainer = styled.div`
  width: 368px;
`;
