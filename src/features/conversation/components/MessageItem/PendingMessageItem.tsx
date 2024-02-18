import { type FC, useCallback, useContext } from 'react';
import { type Message } from '@twilio/conversations';
import ConversationHooks from '@/features/conversation/hooks/globalMessages';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import { ConversationViewContext } from '@/features/conversation/contexts/ConversationViewContext';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import {
  ImageMessageBubble,
  TextMessageBubble,
  VideoMessageBubble,
} from '../MessageBubbles';
import { type PendingMessage } from '../../types';
import {
  getFileFromPendingMessage,
  getMediaType,
  isGlobalType,
} from '../../helpers';

export const PendingMessageItem: FC<{
  message: PendingMessage;
  prev?: PendingMessage | Message;
  next?: PendingMessage | Message;
  sameTypeNext?: Message | PendingMessage;
}> = ({ message, prev, next, sameTypeNext }) => {
  const deviceType = useDeviceType();
  const isMobile = Boolean(deviceType === DeviceTypeEnum.MOBILE);
  const { conversationType } = useContext(ConversationViewContext);
  const isGlobal = isGlobalType(conversationType);
  const messageItemMaxLength = isGlobal && !isMobile ? '600px' : undefined;

  const { resendErrorMessage } = useContext(ActiveConversationContext);
  const { pendingMessageBubbleProps } = ConversationHooks.useMessageBubbleProps(
    {
      message,
      prev,
      next,
      sameTypeNext,
    },
  );
  const file = getFileFromPendingMessage(message);

  const onResend = useCallback(
    (id: string) => {
      resendErrorMessage(id);
    },
    [resendErrorMessage],
  );

  return file ? (
    <>
      {getMediaType(file.type) === 'image' ? (
        <ImageMessageBubble
          {...pendingMessageBubbleProps}
          pendingFile={file}
          onResend={onResend}
        />
      ) : (
        <VideoMessageBubble
          {...pendingMessageBubbleProps}
          pendingFile={file}
          onResend={onResend}
        />
      )}
    </>
  ) : message.text ? (
    <TextMessageBubble
      {...pendingMessageBubbleProps}
      maxWidth={messageItemMaxLength}
      message={message.text}
      onResend={onResend}
    />
  ) : null;
};
