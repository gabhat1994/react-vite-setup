import { forwardRef } from 'react';

import { TSpan } from '@/components/Typography';
import { formartMessageSentDate } from '@/utils/date';
import { MessageAvatar } from './MessageAvatar';
import { MessageSendAgain } from './MessageSendAgain';
import { MessageSender } from './MessageSender';
import { MessageStatus } from './MessageStatus';
import { type MessageProps } from '../types';
import { MessageItem, MessageWrapper, MessageSendDate } from '../styles';
import { MessageTooltip } from './MessageTooltip';

export const MessageBubble = forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      type = 'sent',
      status,
      sender,
      userAvatar,
      showAvatar,
      readers,
      onResend,
      children,
      sendDate,
      showSendDate,
      showSender = true,
      showStatus = true,
      attributes,
    },
    ref,
  ) => (
    <MessageItem ref={ref} data-testid="message-bubble" type={type}>
      {showSendDate && sendDate && (
        <MessageSendDate>
          <TSpan
            font="footnote"
            colorToken="--text-message-status-neutral-default"
          >
            {formartMessageSentDate(sendDate)}
          </TSpan>
        </MessageSendDate>
      )}
      <MessageSender type={type} sender={sender} showSender={showSender} />
      <MessageTooltip
        type={type}
        sendDate={sendDate}
        status={status}
        readers={readers}
      >
        <MessageWrapper type={type}>
          <MessageAvatar
            type={type}
            userAvatar={userAvatar}
            showAvatar={showAvatar}
          />
          {children}
        </MessageWrapper>
      </MessageTooltip>
      <MessageStatus
        type={type}
        status={status}
        readers={readers}
        showStatus={showStatus}
      />
      <MessageSendAgain
        attributes={attributes}
        type={type}
        status={status}
        onResend={onResend}
      />
    </MessageItem>
  ),
);
