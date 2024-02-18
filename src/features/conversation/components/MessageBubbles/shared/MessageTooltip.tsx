import React, { useMemo, useState } from 'react';

import { formartMessageSentDate } from '@/utils/date';
import { type MessageProps } from '../types';
import {
  MessageDateTooltip,
  MessageDateTooltipText,
  MessageOuterWrapper,
} from '../styles';
import { getStatusText } from './helpers';

type Props = Pick<
  MessageProps,
  'sendDate' | 'status' | 'type' | 'readers'
> & {};

export const MessageTooltip: React.FC<Props> = ({
  sendDate,
  status,
  type,
  children,
  readers,
}) => {
  const statusText = useMemo(
    () => status && getStatusText({ status, readers, type }),
    [readers, status, type],
  );
  const [showDateTooltip, setShowDateTooltip] = useState(false);
  let timeout: NodeJS.Timeout;

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    timeout = setTimeout(() => {
      setShowDateTooltip(true);
      clearTimeout(timeout);
    }, 500);
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowDateTooltip(false);
    clearTimeout(timeout);
  };

  return (
    <MessageOuterWrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-testid="message-bubble-hover-area"
      type={type}
    >
      {sendDate && (
        <MessageDateTooltip
          type={type}
          showDateTooltip={showDateTooltip}
          data-testid="message-tooltip"
        >
          <MessageDateTooltipText
            font="body-xs"
            colorToken="--text-tooltip-neutral-alt-default"
            $fill
          >
            {statusText}
          </MessageDateTooltipText>
          <MessageDateTooltipText
            font="body-xs"
            colorToken="--text-tooltip-neutral-alt-default"
            $fill
          >
            {formartMessageSentDate(sendDate)}
          </MessageDateTooltipText>
        </MessageDateTooltip>
      )}
      {children}
    </MessageOuterWrapper>
  );
};
