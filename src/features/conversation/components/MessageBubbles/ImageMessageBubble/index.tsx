import { forwardRef, useState } from 'react';
import ConversationHooks from '@/features/conversation/hooks/globalMessages';
import { Spinner } from '@/components/Spinner';
import LightBox from '@/components/LightBox';
import { ViewType } from '@/components/LightBox/types';
import { MediaMessageFailed } from '../shared/MediaMessageFailed';
import { type MediaMessageProps } from '../types';
import { Container, MediaMessage, MessageImage } from '../styles';
import { MessageBubble } from '../shared/MessageBubble';

export const ImageMessageBubble = forwardRef<HTMLDivElement, MediaMessageProps>(
  (props, ref) => {
    const {
      type = 'sent',
      status,
      showStatus,
      pendingFile,
      media,
      attributes,
    } = props;

    const {
      isLoaded,
      isPending,
      mediaUrl,
      pendingUrl,
      initMedia,
      setLoadingMedia,
      isLoadingMedia,
    } = ConversationHooks.useMediaMessageBubble({ pendingFile, media });
    const [showFullScreen, setShowFullScreen] = useState(false);

    const handleClick = () => {
      // refetch media url which might be expired after several minutes
      initMedia();
      setShowFullScreen(true);
    };

    const { width = 0, height = 0 } = attributes || {};

    return (
      <Container data-testid="image-message-bubble">
        <MessageBubble ref={ref} {...props} showStatus={isLoaded && showStatus}>
          <MediaMessage
            status={status}
            type={type}
            aspectRatio={`${width} / ${height}`}
            isLoading={isLoadingMedia && !isPending}
          >
            {isPending && (
              <MessageImage
                data-testid="message-image-pending"
                status={status}
                src={pendingUrl}
                width={width}
                height={height}
                isPending
              />
            )}

            {isLoaded && (
              <MessageImage
                onClick={handleClick}
                data-testid="message-image"
                width={width}
                height={height}
                status={status}
                isLoading={isLoadingMedia}
                src={pendingUrl || mediaUrl}
                onLoad={() => setLoadingMedia(false)}
              />
            )}

            {(isPending || isLoadingMedia) && <Spinner />}
            <MediaMessageFailed status={status} />
          </MediaMessage>
        </MessageBubble>
        <LightBox
          url={mediaUrl || ''}
          type={ViewType.IMAGE}
          isOpen={showFullScreen}
          handleClose={() => setShowFullScreen(false)}
        />
      </Container>
    );
  },
);
