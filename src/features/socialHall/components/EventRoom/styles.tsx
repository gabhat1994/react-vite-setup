import styled from 'styled-components';
import { sizes } from '@/constants/devices';

const FlexExpandFull = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

export const Wrapper = styled(FlexExpandFull)<{
  showRaiseHand?: boolean;
  isBannerVisible?: boolean;
}>`
  position: relative;
  flex-direction: row;
  background-color: var(--bg-card-neutral-alt-default);
  height: ${(props) => (props.isBannerVisible ? 'calc(100% - 50px)' : '100%')};
  transition: height 0.5s ease;
  @media (max-width: ${sizes.TABLET_L}) {
    flex-direction: ${({ showRaiseHand }) =>
      showRaiseHand ? 'row-reverse' : 'row'};
    justify-content: flex-end;
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
  width: 100%;
`;

export const MainEventUserWrapper = styled.div<{
  isFullScreen: boolean;
  isSpeakerView: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: ${({ isFullScreen }) =>
    isFullScreen ? 'column-reverse' : 'column'};
  align-items: center;
  gap: ${({ isFullScreen }) => (isFullScreen ? '0' : '16px')};
  justify-content: space-evenly;
  ${({ isFullScreen }) =>
    isFullScreen &&
    `
    justify-content: flex-start;
  `};

  height: 100%;
`;

export const ScrollViewWrapper = styled(FlexExpandFull)<{
  isFullScreen: boolean;
}>`
  position: relative;
  flex-direction: ${({ isFullScreen }) =>
    isFullScreen ? 'column-reverse' : 'column'};
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: ${({ isFullScreen }) => (isFullScreen ? '0' : '20px 27px')};
  box-sizing: border-box;
  height: calc(100% - 65px);
  overflow-y: hidden;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 0 16px;
  }
  @media (max-width: ${sizes.LAPTOP}) {
    height: calc(100% - 200px);
  }
  @media (max-width: ${sizes.MOBILE_L}) {
    height: calc(100% - 160px);
  }
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
