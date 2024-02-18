import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import useIsTabFocused from '@/hooks/useIsTabFocused';
import useIsInViewPort from '@/hooks/useIsInViewPort';
import VideoJS from './VideoJS';
import { PlayButton, Video, VideoWrapper } from './styles';
import { type VideoPlayerProps } from './types';

const VideoPlayer = (props: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const { t } = useTranslation();
  const isTabFocused = useIsTabFocused();
  const isIntersecting = useIsInViewPort(videoRef);

  const {
    url,
    fileType,
    onLoadedData,
    onGotDuration,
    width,
    height,
    isSquare,
  } = props;
  const videoJsOptions = useMemo(
    () => ({
      autoplay: false,
      bigPlayButton: props.bigPlayButton ?? true,
      controlBar: props.isCollapse ? undefined : {},
      controls: props.controls ?? true,
      responsive: props.responsive ?? false,
      fluid: props.fluid ?? false,
      html5: {
        nativeTextTracks: false,
      },
      sources: [
        {
          src: url ?? '',
          type: fileType ?? 'video/mp4',
        },
      ],
      width,
      height,
    }),
    [
      fileType,
      height,
      props.bigPlayButton,
      props.controls,
      props.fluid,
      props.isCollapse,
      props.responsive,
      url,
      width,
    ],
  );

  useEffect(() => {
    if (videoRef?.current) {
      const player = videoRef.current;
      if ((!isIntersecting || !isTabFocused) && player.played) {
        setIsPaused(true);
        player.pause();
      }
    }
  }, [isIntersecting, isTabFocused]);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.onplay = () => {
        setIsPaused(false);
      };
      videoRef.current.onpause = () => {
        setIsPaused(true);
      };
    }
  }, []);

  if (!url)
    return (
      <TSpan
        data-testid="no_video_found"
        colorToken="--text-input-neutral-default"
      >
        {t('noumena.video.no_video_found')}
      </TSpan>
    );

  const onPlayButtonClick = () => {
    if (videoRef?.current) {
      const player = videoRef.current;
      if (player.paused) {
        player.play();
        setIsPaused(false);
      } else {
        player.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <>
      {fileType === 'video/quicktime' ? (
        <VideoWrapper>
          <Video
            ref={videoRef}
            controls={!props.isCollapse}
            isSquare={isSquare}
            width="100%"
            height="auto"
          >
            <track kind="captions" />
            <source src={url} />
          </Video>
          {isPaused && <PlayButton onClick={onPlayButtonClick} />}
        </VideoWrapper>
      ) : (
        <VideoJS
          options={videoJsOptions}
          isCollapse={props.isCollapse}
          onLoadedData={onLoadedData}
          onGotDuration={onGotDuration}
        />
      )}
    </>
  );
};

export default VideoPlayer;
