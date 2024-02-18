import { Spacer } from '@/layout';
import { MuteControl, VideoControl } from '../ControlPanel';
import { MediaControlWrapper } from './styles';
import { type MediaControlButtonProps } from './types';

export const MediaControlButton = ({
  muteAudio,
  muteVideo,
  isLoading,
  onToggleAudio,
  onToggleVideo,
  hasAudioPermission,
  hasVideoPermission,
}: MediaControlButtonProps) => (
  <MediaControlWrapper>
    <MuteControl
      isError={!hasAudioPermission}
      isMuted={muteAudio}
      onToggle={onToggleAudio}
    />
    <Spacer width={16} />
    <VideoControl
      isLoading={isLoading && hasVideoPermission}
      isCameraEnable={!muteVideo}
      onToggle={onToggleVideo}
      isError={!hasVideoPermission}
    />
  </MediaControlWrapper>
);
