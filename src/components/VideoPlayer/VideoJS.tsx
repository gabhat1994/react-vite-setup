import { type MouseEvent, useEffect, useMemo, useRef } from 'react';
import 'video.js/dist/video-js.css';

import videojs from 'video.js';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import useIsTabFocused from '@/hooks/useIsTabFocused';
import useIsInViewPort from '@/hooks/useIsInViewPort';

interface VideoPlayerPropsInferface {
  options: videojs.PlayerOptions;
  onLoadedData?: () => void;
  onGotDuration?: (length: number) => void;
  isCollapse?: boolean;
}

const VideoJS = (props: VideoPlayerPropsInferface) => {
  const videoRef = useRef(null);
  const playerRef = useRef<videojs.Player | null>();
  const { options, onLoadedData, onGotDuration } = props;

  useEffect(() => {
    if (options.sources) playerRef.current?.src(options.sources);
    playerRef.current?.load();
  }, [options.sources]);

  const togglePlayPauseOnClick = (event: MouseEvent<HTMLVideoElement>) => {
    const { tagName } = event.target as HTMLElement;
    if (tagName === 'VIDEO') {
      if (playerRef.current?.paused()) {
        playerRef.current?.play();
      } else {
        playerRef.current?.pause();
      }
    }
  };

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = videojs(videoElement, options);
      playerRef.current = player;
      playerRef.current.on('loadeddata', () => {
        onLoadedData?.();
        if (onGotDuration) {
          onGotDuration(playerRef.current?.duration() ?? 0);
        }
      });

      playerRef.current.on('click', (e) => {
        togglePlayPauseOnClick(e);
      });
      playerRef.current.on('touchend', (e) => {
        togglePlayPauseOnClick(e);
      });
    } else if (props.isCollapse) {
      if (
        document.pictureInPictureElement &&
        playerRef.current.exitPictureInPicture
      ) {
        playerRef.current.exitPictureInPicture();
      }
      playerRef.current.load();
      playerRef.current?.controlBar.hide();
    } else {
      playerRef.current?.controlBar.show();
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef, props.isCollapse, onLoadedData, onGotDuration]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);

  const style = useMemo(
    () => (isMobile ? { maxWidth: '91vw' } : undefined),
    [isMobile],
  );

  const isTabFocused = useIsTabFocused();
  const isIntersecting = useIsInViewPort(videoRef);

  useEffect(() => {
    if (videoRef?.current) {
      const player = playerRef.current;
      if ((!isIntersecting || !isTabFocused) && player?.played()) {
        player.pause();
      }
    }
  }, [isIntersecting, isTabFocused]);

  return (
    <div data-vjs-player data-testid="videoPlayer">
      <video
        ref={videoRef}
        className="video-js vjs-default-skin vjs-big-play-centered vjs-show-big-play-button-on-pause"
        style={style}
        width="100%"
      >
        <track default kind="captions" />
      </video>
    </div>
  );
};

export default VideoJS;
