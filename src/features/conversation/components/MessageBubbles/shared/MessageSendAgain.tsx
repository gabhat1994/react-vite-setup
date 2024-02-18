import React from 'react';
import { Trans } from 'react-i18next';

import { TSpan } from '@/components/Typography';
import { type MessageProps } from '../types';
import { StatusWrapper, ResendButton } from '../styles';

export const MessageSendAgain: React.FC<
  Pick<MessageProps, 'type' | 'status' | 'attributes' | 'onResend'>
> = ({ type, status, attributes, onResend }) => {
  if (type === 'received') return null;
  if (status !== 'failed') return null;

  return (
    <StatusWrapper type={type} data-testid="message-send-again">
      <TSpan
        font="footnote"
        colorToken="--text-message-status-danger-primary-default"
      >
        <Trans
          i18nKey="noumena.message.failed_try_again"
          components={{
            button: (
              <ResendButton
                font="link-s"
                colorToken="--text-message-status-danger-primary-default"
                data-testid="send-button"
                onClick={() => onResend && onResend(attributes?.id || '')}
              />
            ),
          }}
        />
      </TSpan>
    </StatusWrapper>
  );
};
