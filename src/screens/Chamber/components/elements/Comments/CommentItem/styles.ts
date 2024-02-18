import { Stack } from '@/layout';
import styled, { css } from 'styled-components';

export const CommentItemAddContainer = styled(Stack)`
  gap: 16px;
  position: relative;
  width: 100%;
`;

const replyBorder = css`
  &:before {
    border-left: 1px solid var(--bg-separator-neutral-highlighted);
    border-bottom: 1px solid var(--bg-separator-neutral-highlighted);
    border-bottom-left-radius: 20px;
    position: absolute;
    content: '';
    left: -28px;
    top: -60px;
    width: 20px;
    height: 80px;
    display: block;
  }
`;

export const AvatarContainer = styled.div<{
  isReply?: boolean;
}>`
  z-index: 1;
  ${({ isReply }) => (isReply ? replyBorder : '')}
`;
