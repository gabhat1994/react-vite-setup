import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

import {
  type TextMessageProps,
  type MediaMessageProps,
  type MessageProps,
  type MessageBubbleType,
} from './types';

export const MessageItem = styled.div<{ type: MessageBubbleType }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding-bottom: 2px;
  z-index: 1;
  ${({ type }) =>
    type === 'received' ? `align-items: flex-start;` : `align-items: flex-end;`}
`;

export const MessageSendDate = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
`;

export const MessageWrapper = styled.div<Pick<MessageProps, 'type'>>`
  display: flex;
  align-items: flex-end;
  ${({ type }) =>
    type === 'received'
      ? `flex-direction: row;`
      : `flex-direction: row-reverse;`}
`;

export const AvatarWrapper = styled.div<Pick<MessageProps, 'type'>>`
  width: 24px;
  height: 24px;
  ${({ type }) =>
    type === 'received' ? `margin-right: 8px;` : `margin-left: 8px;`}
`;

export const TextMessage = styled.div<
  Pick<TextMessageProps, 'type' | 'justSentPrev' | 'justSentNext' | 'maxWidth'>
>`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  max-width: ${({ maxWidth }) => maxWidth ?? '300px'};
  ${({ type }) =>
    type === 'received'
      ? `
        background-color: var(--bg-message-bubble-neutral-default);
      `
      : `
        background-color: var(--bg-message-bubble-brand-primary-default);
      `}
  ${({ justSentPrev, type }) =>
    type !== 'received' && justSentPrev && `border-bottom-right-radius: 2px`};
  ${({ justSentNext, type }) =>
    type !== 'received' && justSentNext && `border-top-right-radius: 2px`};
  ${({ justSentPrev, type }) =>
    type === 'received' && justSentPrev && `border-bottom-left-radius: 2px`};
  ${({ justSentNext, type }) =>
    type === 'received' && justSentNext && `border-top-left-radius: 2px`};
  & > span {
    ${({ type }) =>
      type === 'received'
        ? `color: var(--text-message-bubble-neutral-highlighted);`
        : `color: var(--text-message-bubble-neutral-alt-default);`}
  }
`;

export const SpinnerWrapper = styled.div<{ visible: boolean }>`
  position: relative;
  transform: scale(0);
  width: 0;
  height: 0;
  transition: all 0.2s ease-in-out;
  ${({ visible }) =>
    visible
      ? `
        transform: scale(1);
        width: 24px;
        height: 24px;
        margin-right: 5px;
      `
      : undefined}
`;

export const StatusWrapper = styled.div<Pick<MessageProps, 'type'>>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0;
  padding-top: 0;
  ${({ type }) =>
    type === 'received'
      ? `
      text-align: left;
      padding-left: 32px;
    `
      : `
      align-items: flex-start;
      padding-right: 0;
    `}
`;

export const ResendButton = styled(TSpan).attrs((props) => ({
  ...props,
}))`
  cursor: pointer;
`;

export const SenderWrapper = StatusWrapper;

const MediaWrapper = styled.div`
  max-width: 240px;
  min-width: 150px;
  max-height: 240px;
`;

export const MediaMessage = styled(MediaWrapper)<
  Pick<MediaMessageProps, 'status' | 'type'> & {
    width?: number;
    height?: number;
    aspectRatio?: string;
    isLoading?: boolean;
  }
>`
  ${({ aspectRatio }) => (aspectRatio ? `aspect-ratio: ${aspectRatio}` : '')};
  ${({ width }) => (width ? `width: ${width}px` : '')};
  ${({ height }) => (height ? `height: ${height}px` : '')};

  background-color: ${({ isLoading }) =>
    isLoading ? 'var(--bg-image-placeholder-neutral-default)' : ''};

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
  ${({ status, type }) =>
    type !== 'received' && status === 'sending'
      ? `
      &:before {
        content: ' ';
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7));
        z-index: 1;
      }
    `
      : undefined};
`;

type MessageImageProps = Pick<MessageProps, 'status'> & {
  isPending?: boolean;
  isLoading?: boolean;
};

export const MessageImage = styled.img<MessageImageProps>`
  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  max-height: 100%;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  border-radius: 8px;
  ${({ status }) => status === 'failed' && `opacity: 0;`}
  ${({ isPending }) => isPending && `opacity: 0.4;`}
  ${({ isLoading }) => isLoading && `opacity: 0;`}
`;

export const MessageVideo = styled.div<Pick<MessageProps, 'status'>>`
  max-width: 100%;
  min-width: 100%;
  max-height: 100%;
  min-height: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ status }) => status === 'failed' && `opacity: 0;`}
`;

export const FailedMediaWrapper = styled(MediaWrapper)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-image-placeholder-neutral-default);
`;

export const StyledImage = styled.img``;

export const MessageDateTooltip = styled.div<
  Pick<MessageProps, 'type'> & { showDateTooltip: boolean }
>`
  background-color: var(--bg-tooltip-neutral-default);
  border-radius: 4px;
  left: 0;
  padding: 4px 8px;
  display: flex;
  max-width: 60px;
  flex-direction: column;
  text-align: center;
  ${({ type }) =>
    type === 'sent' ? `margin-right: 8px;` : `margin-left: 8px;`}

  opacity: ${({ showDateTooltip }) => (showDateTooltip ? 1 : 0)};
  transition: opacity 0.3s;
`;

export const MessageOuterWrapper = styled.div<Pick<MessageProps, 'type'>>`
  display: flex;
  align-items: center;
  ${({ type }) =>
    type === 'sent' ? `flex-direction: row;` : `flex-direction: row-reverse;`}
`;

export const MessageDateTooltipText = styled(TSpan)``;

export const Container = styled.div`
  width: 100%;
  margin-bottom: 2px;
`;

export const TextMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LinkPreviewWrapper = styled.div<{ isSent: boolean }>`
  display: flex;
  flex-direction: column;
  max-height: 211px;
  background-color: var(--bg-message-bubble-neutral-default);
  border-radius: ${({ isSent }) => (isSent ? '0 0 2px 8px' : '0 0 8px 2px')};
`;

export const LinkPreviewTextWrapper = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const LinkPreviewTitle = styled(TSpan).attrs({
  colorToken: '--text-message-bubble-neutral-highlighted',
  font: 'body-m-bold',
})``;

export const LinkPreviewNote = styled(TSpan).attrs({
  colorToken: '--text-message-bubble-neutral-default',
  font: 'footnote',
})``;
