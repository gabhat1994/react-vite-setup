import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { Content } from '@/screens/Community/Comments/styles';
import styled from 'styled-components';

export const HeadLine = styled(Stack)`
  gap: 12px;
  align-items: center;
`;

export const SendButton = styled(Button)`
  padding: 0;
  min-width: 24px;
  background-color: transparent !important;
`;

export const CommentContainer = styled(Stack)`
  width: 100%;
  align-items: flex-start;
  position: relative;
`;

export const CommentsContainer = styled(Stack)<{
  hasReplies?: boolean;
  hasMore?: boolean;
}>`
  flex-direction: column;
  width: 100%;
  gap: 16px;
  position: relative;
`;
export const CommentsItemContainer = styled(Content)`
  background-color: unset;
  padding: 0;
`;

export const CommentsListWrapper = styled(Content)<{
  isReply?: boolean;
  hasReplies?: boolean;
}>`
  position: relative;
  background: var(--bg-comment-neutral-default);

  &:before {
    border-left: 1px solid var(--bg-separator-neutral-highlighted);
    position: absolute;
    content: '';
    left: ${({ isReply }) => (isReply ? '-84px' : '-36px')};
    top: ${({ isReply }) => (isReply ? '0' : '46px')};
    width: 1px;
    height: calc(100% - 40px);
    display: ${({ hasReplies }) => (hasReplies ? 'block' : 'none')};
  }
`;

export const CommentsListContainer = styled(Stack)<{
  withPaddingTop?: boolean;
  hasReplies?: boolean;
}>`
  flex-direction: column;
  position: relative;
  width: 100%;
  gap: 16px;
  box-sizing: border-box;
  padding-top: ${({ withPaddingTop }) => (withPaddingTop ? '16px' : '0px')};
`;

export const LoadMoreContainer = styled(Stack)<{ isReply?: boolean }>`
  width: 100%;
  gap: 12px;
  align-items: center;
  position: relative;
  &:before {
    border-left: 1px solid var(--bg-separator-neutral-highlighted);
    border-bottom: 1px solid var(--bg-separator-neutral-highlighted);
    border-bottom-left-radius: 20px;
    position: absolute;
    content: '';
    left: -28px;
    top: -60px;
    width: 20px;
    height: 70px;
    display: ${({ isReply }) => (isReply ? 'block' : 'none')};
  }
`;
export const CommentNameContainer = styled(CommentContainer)`
  justify-content: space-between;
`;
export const ButtonWrap = styled(Stack)`
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

export const CommentInputContainer = styled(Stack)<{
  level: number;
  hasComments?: boolean;
}>`
  width: 100%;
  gap: 12px;
  border-top: ${({ level }) =>
    level === 0 ? '1px solid var(--bg-separator-neutral-default)' : 'none'};
  border-bottom: ${({ level, hasComments }) =>
    level === 0 && hasComments
      ? '1px solid var(--bg-separator-neutral-default)'
      : 'none'};
  padding-top: ${({ level }) => (level === 0 ? '16px' : '0')};
  padding-bottom: ${({ level }) => (level === 0 ? '16px' : '0')};
  z-index: 2;
`;

export const LoadMoreText = styled(TSpan)`
  font-size: var(--font-body-medium-size);
`;
