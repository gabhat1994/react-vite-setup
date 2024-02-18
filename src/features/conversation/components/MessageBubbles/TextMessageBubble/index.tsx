import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useLaunchDarkly } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { Spinner } from '@/components/Spinner';

import { getLinkTextMessage } from '@/features/conversation/helpers';
import { type TextMessageProps } from '../types';
import {
  TextMessage,
  SpinnerWrapper,
  Container,
  TextMessageWrapper,
} from '../styles';

import { MessageBubble } from '../shared/MessageBubble';
import LinkPreview from './LinkPreview';

export const TextMessageBubble = forwardRef<HTMLDivElement, TextMessageProps>(
  (props, ref) => {
    const {
      type = 'sent',
      status,
      message,
      justSentPrev = true,
      justSentNext,
      maxWidth,
    } = props;

    const {
      flags: { messageLinkPreviews },
    } = useLaunchDarkly();

    const [isSpinner, setIsSpinner] = useState(false);
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (timer.current) clearTimeout(timer.current);
      setIsSpinner(false);

      if (status === 'sending') {
        timer.current = setTimeout(() => {
          setIsSpinner(true);
        }, 2000);
      }
    }, [status]);

    useEffect(
      () => () => {
        if (timer.current) clearTimeout(timer.current);
      },
      [],
    );
    const { firstUrl, styledMessage } = useMemo(
      () => getLinkTextMessage(message),
      [message],
    );
    return (
      <Container data-testid="text-message-bubble">
        <MessageBubble ref={ref} {...props}>
          <TextMessageWrapper>
            <TextMessage
              type={type}
              justSentPrev={justSentPrev}
              justSentNext={justSentNext}
              maxWidth={maxWidth}
            >
              {type === 'sent' && (
                <SpinnerWrapper visible={isSpinner}>
                  <Spinner />
                </SpinnerWrapper>
              )}
              <TSpan
                data-testid="text-message"
                flex={1}
                font="body-m"
                colorToken="--text-message-bubble-neutral-highlighted"
                style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
              >
                {styledMessage}
              </TSpan>
            </TextMessage>
            {messageLinkPreviews && firstUrl && (
              <LinkPreview isSent={type === 'sent'} url={firstUrl} />
            )}
          </TextMessageWrapper>
        </MessageBubble>
      </Container>
    );
  },
);
