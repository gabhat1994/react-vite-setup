import { sizes } from '@/constants/devices';
import { Spacer } from '@/layout';
import { memo } from 'react';
import styled from 'styled-components';
import VideoPlayer from './VideoPlayer';
import { type VideoPlayerViewProps } from './types';

const ProgressBarWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
`;

const VideoArea = styled.div<VideoPlayerViewProps>`
  width: 100%;

  ${({ isCollapse }) => (isCollapse ? 'height: 64px;' : '')}
  ${({ viewOnly }) => (viewOnly ? 'border-radius: 8px;' : '')}
  opacity: ${({ isLoading }) => (isLoading ? 0.4 : 1)};

  .video-js {
    width: auto;
    min-width: 100%;
    height: fit-content;
    max-width: ${({ isCollapse }) => (isCollapse ? '120px' : '100%')};
    ${({ isCollapse }) => (isCollapse ? 'height: 64px;' : 'max-height: 413px;')}
    border-radius: 8px;
    .vjs-tech {
      position: relative !important;
    }
    .vjs-big-play-button,
    &:hover .vjs-big-play-button {
      width: ${({ isCollapse }) => (!isCollapse ? '56px' : '40px')};
      height: ${({ isCollapse }) => (!isCollapse ? '56px' : '40px')};
      background: var(--bg-button-brand-primary-default);
      border: none !important;
      ${({ isCollapse }) =>
        isCollapse ? 'border-radius: 12px;' : 'border-radius: 8px;'}
    }
    &.vjs-big-play-centered .vjs-big-play-button {
      margin-left: ${({ isCollapse }) => (isCollapse ? '-0.7em' : '-1em')};
      margin-top: ${({ isCollapse }) => (isCollapse ? '-0.6em' : '0')};
      transform: ${({ isCollapse }) =>
        isCollapse ? 'none' : 'translateY(-50%)'};
    }
    .vjs-icon-placeholder:before {
      margin-top: ${({ isCollapse }) => (isCollapse ? '-3px' : '4px')};
    }
    .vjs-control-bar {
      border-radius: 8px;
    }
    ${({ fullHeight }) => fullHeight && 'max-height: unset;'}
  }
  .video-js button {
    color: var(--icon-button-neutral-alt-default);
  }

  @media (max-width: ${sizes.TABLET_L}) {
    .video-js {
      width: 100%;
      ${({ isCollapse }) =>
        isCollapse ? 'height: 64px;' : 'max-height: 413px;'}
    }
  }

  @media (max-width: ${sizes.TABLET}) {
    .video-js {
      min-width: 100%;
      max-width: 100%;
      ${({ isCollapse }) =>
        isCollapse ? 'height: 64px;' : 'max-height: 180px;'}
    }
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    .video-js {
      max-width: ${({ isCollapse }) => (isCollapse ? '120px' : '91vw')};
    }
  }
`;

export const VideoPlayerView = memo(
  ({ fullHeight, ...props }: VideoPlayerViewProps) => (
    <ProgressBarWrapper data-testid="video-element-view">
      {!props.viewOnly && !props.url && <Spacer height={16} />}
      <VideoArea {...props} fullHeight={fullHeight}>
        <VideoPlayer
          url={props.url}
          fileType={props.fileType}
          onLoadedData={props.onLoadedData}
          isCollapse={props.isCollapse}
          bigPlayButton={props.bigPlayButton}
          controls={props.controls}
          width={props.width}
          height={props.height}
          isSquare={props.isSquare}
        />
      </VideoArea>
    </ProgressBarWrapper>
  ),
);
