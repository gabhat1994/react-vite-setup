import { type CSSProperties, type FC } from 'react';
import _ReactPlayer from 'react-player';
import { type ReactPlayerProps } from 'react-player/types/lib';
import { Modal, ModalCloseButton } from '@/components/ExtendedModal';
import { VideoWrapper } from './styles';
import { type VideoPlayerModalProps } from './types';

const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

const style = { padding: 0 } as CSSProperties;

export const VideoPlayerModal: FC<VideoPlayerModalProps> = ({
  testId,
  videoURL,
  onClose,
  open,
}) => (
  <Modal
    isFullScreen={false}
    open={open}
    onClose={onClose}
    noPaddingNoBorder
    enableAnimation
    overlayVariant="dark"
    style={style}
    disableBackdropClick
    modalHeaderAddonButtons={
      <ModalCloseButton
        top={32}
        horizontal={40}
        enforceRight
        onClose={onClose}
        color="--icon-button-neutral-alt-default"
        transparentModalCloseButton={true}
      />
    }
  >
    <VideoWrapper data-testid={testId}>
      <ReactPlayer url={videoURL} controls={true} playing />
    </VideoWrapper>
  </Modal>
);
