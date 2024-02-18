import { useRef } from 'react';
import { Modal, ModalCloseButton } from '../ExtendedModal';
import { Content, Video } from './styles';
import { type VideoViewerProps } from './types';

const VideoViewer = (props: VideoViewerProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  const ActionButtons = () => (
    <ModalCloseButton
      top={32}
      horizontal={40}
      enforceRight
      onClose={props.handleClose}
    />
  );

  return (
    <>
      <Modal
        isFullScreen={false}
        testId="light-box"
        open={props.isOpen}
        onClose={props.handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        overlayVariant="dark"
        noPaddingNoBorder
        modalHeaderAddonButtons={<ActionButtons />}
      >
        <Content data-testid="modal-content-lightbox">
          <Video
            ref={ref}
            data-testid="light-box-video-testid"
            draggable="false"
            onError={() => {
              props.setVideoError(true);
            }}
            src={props.url}
          >
            <source src={props.url} type={props.contentType} />
          </Video>
        </Content>
      </Modal>
    </>
  );
};

export default VideoViewer;
