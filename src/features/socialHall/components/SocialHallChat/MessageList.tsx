import { type FC, useMemo } from 'react';
import { format } from 'date-fns';
import {
  TextMessageBubble,
  ImageMessageBubble,
} from '@/features/conversation/components/MessageBubbles';
import { MessageType, type SocialHallChat } from '@/screens/SocialHall/types';
import { useEmoticons } from '@/hooks/useEmoticons';
import {
  MessageListWrapper,
  NotificationMessage,
  NotificationTime,
} from './styles';

type MessageListProps = {
  messages: SocialHallChat[];
};

const MessageItem: FC<{ message: SocialHallChat }> = ({
  message: { message, profileUrl, messageType, align, ...props },
}) => {
  const updateMessageWithEmoji = useEmoticons(
    messageType === MessageType.TEXT ? (message as string) : '',
  );
  const bubbleProps = useMemo(
    () => ({
      message,
      showAvatar: true,
      userAvatar: profileUrl,
      maxWidth: '100%',
      ...props,
    }),
    [message, profileUrl, props],
  );
  if (messageType === MessageType.IMAGE) {
    return <ImageMessageBubble {...bubbleProps} showStatus={false} />;
  }

  if (messageType === MessageType.NOTIFICATION) {
    return (
      <>
        <NotificationMessage
          dangerouslySetInnerHTML={{ __html: message.toString() }}
        />
        <NotificationTime>{format(new Date(), 'hh:mm a')}</NotificationTime>
      </>
    );
  }

  const newProps = {
    ...bubbleProps,
    message: updateMessageWithEmoji ?? (message as string),
  };
  return <TextMessageBubble {...newProps} showStatus={false} />;
};

export const MessageList = ({ messages }: MessageListProps) => (
  <MessageListWrapper>
    {messages.map((message) => (
      <MessageItem key={message._id} message={message} />
    ))}
  </MessageListWrapper>
);
