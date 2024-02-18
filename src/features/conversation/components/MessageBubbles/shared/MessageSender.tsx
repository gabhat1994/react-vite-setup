import React from 'react';

import { TSpan } from '@/components/Typography';
import { type MessageProps } from '../types';
import { SenderWrapper } from '../styles';

export const MessageSender: React.FC<
  Pick<MessageProps, 'type' | 'sender' | 'showSender'>
> = ({ type, sender, showSender }) => {
  if (type !== 'received' || !showSender || !sender) return null;

  return (
    <SenderWrapper type={type} data-testid="message-sender">
      <TSpan
        data-testid="sender"
        font="body-s"
        colorToken="--text-message-status-neutral-default"
      >
        {sender}
      </TSpan>
    </SenderWrapper>
  );
};
