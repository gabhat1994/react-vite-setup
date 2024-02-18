import { type FC, useContext, useEffect, useRef } from 'react';
import { type Message } from '@twilio/conversations';
import useElementOnScreen from '@/hooks/intersecting';
import ConversationHooks from '@/features/conversation/hooks/globalMessages';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import { ConversationViewContext } from '@/features/conversation/contexts/ConversationViewContext';
import { ConversationUnreadStatusContext } from '@/features/conversation/contexts/ConversationUnreadStatusContext';
import {
  ImageMessageBubble,
  TextMessageBubble,
  VideoMessageBubble,
} from '../MessageBubbles';
import { type MessageAttributes, type PendingMessage } from '../../types';
import { getMediaType, getMessageItemMaxLength } from '../../helpers';

export const MessageItem: FC<{
  message: Message;
  prev?: Message;
  next?: Message;
  sameTypeNext?: Message | PendingMessage;
}> = ({ message, prev, next, sameTypeNext }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useElementOnScreen(ref, {
    root: document.querySelector('body'),
    rootMargin: '0px',
    threshold: 0.5,
  });

  const { conversationType, conversationWrapperWidth } = useContext(
    ConversationViewContext,
  );
  const messageItemMaxLength = getMessageItemMaxLength(
    conversationType,
    conversationWrapperWidth,
  );

  const { activeConversationSid, removePendingMessage } = useContext(
    ActiveConversationContext,
  );
  const { conversation } = ConversationHooks.useConversation({
    sid: activeConversationSid,
  });
  const { readConversation } = useContext(ConversationUnreadStatusContext);

  const { messageBubbleProps } = ConversationHooks.useMessageBubbleProps({
    message,
    prev,
    next,
    sameTypeNext,
  });

  // we currently do support only one media per message
  const media = message.attachedMedia?.[0];

  useEffect(() => {
    const attrs = message.attributes as MessageAttributes;
    if (attrs?.id) {
      removePendingMessage(attrs.id);
    }
  }, [message.attributes, removePendingMessage]);

  useEffect(() => {
    if (!next && isVisible) {
      (async () => {
        await conversation?.setAllMessagesRead();
        readConversation(activeConversationSid);
      })();
    }
  }, [activeConversationSid, conversation, isVisible, next, readConversation]);

  return messageBubbleProps ? (
    <>
      {media ? (
        getMediaType(media.contentType) === 'video' ? (
          <VideoMessageBubble
            data-testid="video-message-bubble"
            {...messageBubbleProps}
            media={media}
            ref={ref}
          />
        ) : (
          <ImageMessageBubble
            data-testid="image-message-bubble"
            {...messageBubbleProps}
            media={media}
            ref={ref}
          />
        )
      ) : (
        message.body && (
          <TextMessageBubble
            data-testid="text-message-bubble"
            {...messageBubbleProps}
            maxWidth={messageItemMaxLength}
            ref={ref}
          />
        )
      )}
    </>
  ) : null;
};
