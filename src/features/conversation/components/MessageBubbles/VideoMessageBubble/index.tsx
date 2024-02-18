import { Spinner } from '@/components/Spinner';
import { VideoPlayerView } from '@/components/VideoPlayer';
import ConversationHooks from '@/features/conversation/hooks/globalMessages';
import { forwardRef } from 'react';
import { MediaMessageFailed } from '../shared/MediaMessageFailed';
import { MessageBubble } from '../shared/MessageBubble';
import { Container, MediaMessage, MessageVideo } from '../styles';
import { type MediaMessageProps } from '../types';

// set constant dimensions to avoid flickering while loading a videos.
// it only change a video container dimensions keeping video aspect ratio.
const VIDEO_BUBBLE_DIMENSIONS = {
  width: 240,
  height: 240,
};

export const VideoMessageBubble = forwardRef<HTMLDivElement, MediaMessageProps>(
  (props, ref) => {
    const { type = 'sent', status, showStatus, media, pendingFile } = props;

    const { isLoadingMedia, isPending, mediaUrl, pendingUrl, setLoadingMedia } =
      ConversationHooks.useMediaMessageBubble({ pendingFile, media });

    return (
      <Container data-testid="video-message-bubble">
        <MessageBubble
          ref={ref}
          {...props}
          showStatus={!isLoadingMedia && showStatus}
        >
          <MediaMessage
            status={status}
            type={type}
            width={VIDEO_BUBBLE_DIMENSIONS.width}
            height={VIDEO_BUBBLE_DIMENSIONS.height}
            isLoading={!!isLoadingMedia && !isPending}
          >
            <MessageVideo data-testid="message-video" status={status}>
              {isPending && (
                <VideoPlayerView
                  viewOnly
                  url={pendingUrl}
                  width={VIDEO_BUBBLE_DIMENSIONS.width}
                  height={VIDEO_BUBBLE_DIMENSIONS.height}
                  fileType={pendingFile?.type}
                  controls={false}
                  isLoading
                />
              )}

              {mediaUrl && (
                <VideoPlayerView
                  viewOnly
                  url={mediaUrl}
                  width={VIDEO_BUBBLE_DIMENSIONS.width}
                  height={VIDEO_BUBBLE_DIMENSIONS.height}
                  fileType={media?.contentType}
                  onLoadedData={() => setLoadingMedia(false)}
                />
              )}
            </MessageVideo>
            {(isPending || isLoadingMedia) && <Spinner />}
            <MediaMessageFailed status={status} />
          </MediaMessage>
        </MessageBubble>
      </Container>
    );
  },
);
