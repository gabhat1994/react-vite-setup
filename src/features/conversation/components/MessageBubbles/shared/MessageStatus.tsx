import React, { useMemo } from 'react';

import { TSpan } from '@/components/Typography';
import { type MessageProps } from '../types';
import { StatusWrapper } from '../styles';
import { getStatusText } from './helpers';

export const MessageStatus: React.FC<
  Pick<MessageProps, 'type' | 'status' | 'readers' | 'showStatus'>
> = ({ type, status, readers, showStatus }) => {
  const statusText = useMemo(
    () => getStatusText({ status, readers, type }),
    [readers, status, type],
  );

  if (!showStatus || !statusText) return null;

  return (
    <StatusWrapper type={type} data-testid="message-status">
      <TSpan
        data-testid="status"
        font="footnote"
        colorToken="--text-message-status-neutral-default"
      >
        {statusText}
      </TSpan>
    </StatusWrapper>
  );
};
