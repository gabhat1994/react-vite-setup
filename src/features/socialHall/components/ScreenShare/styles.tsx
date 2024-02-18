import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { type VideoMasonryLayoutCalc } from '@/features/socialHall/hooks';
import { TSpan } from '@/components/Typography';

export const ControlIconWrapper = styled.div<{
  backgroundColor?: string;
  cursorAllowed?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--bg-button-neutral-alt-default);
  border-radius: 8px;
  cursor: ${({ cursorAllowed }) => (cursorAllowed ? 'pointer' : 'not-allowed')};
`;

export const PinedFrame = styled.div<{
  isFullScreen?: boolean;
  dimension?: VideoMasonryLayoutCalc;
}>`
  overflow: hidden;
  video {
    border-radius: ${({ isFullScreen }) => (isFullScreen ? '0px' : '12px')};
    object-fit: ${({ isFullScreen }) =>
      isFullScreen ? 'contain' : 'cover'} !important;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    width: ${({ isFullScreen }) => (isFullScreen ? '100vw' : '95vw')};
  }
  height: ${({ isFullScreen }) => (isFullScreen ? '83vh' : `none`)};
  aspect-ratio: 16/9;
`;

export const StopSharing = styled(PinedFrame)`
  background-color: var(--overlay-avatar-neutral-alt-opacity-default);
  inset: 0;
  position: absolute;
  z-index: 10;
  display: none;
  border-radius: 12px;
`;

export const PinnedFrameWrapper = styled.div<{
  isShareUserFeed: boolean;
  isFullScreen: boolean;
}>`
  border: ${({ isFullScreen }) =>
    isFullScreen
      ? 'none'
      : '3px solid var(--border-card-brand-primary-default)'};
  border-radius: 8px;
  position: relative;
  &:hover ${StopSharing} {
    display: ${({ isShareUserFeed }) => (isShareUserFeed ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
  }
`;

export const CloseFullScreenButton = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 1;
`;

export const FullScreenButton = styled.div<{ isShareUserFeed: boolean }>`
  display: ${({ isShareUserFeed }) => (isShareUserFeed ? 'flex' : 'none')};
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
  z-index: 1;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: var(--overlay-avatar-neutral-alt-opacity-default);
`;

export const ScreenShareWarpper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 1;
`;

export const ScreenSharingLabel = styled(TSpan)`
  color: var(--text-tablecell-body-neutral-default);
  &:first-letter {
    text-transform: capitalize;
  }
`;
