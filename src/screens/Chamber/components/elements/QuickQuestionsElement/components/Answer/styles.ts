import styled from 'styled-components';
import { Stack } from '@/layout';

export const Wrapper = styled(Stack).attrs((props) => ({
  ...props,
  gap: 16,
}))``;

export const AvatarWrapper = styled.div``;

export const ContentWrapper = styled.div<{ isMyAnswer: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ isMyAnswer }) =>
    isMyAnswer
      ? 'var(--bg-comment-brand-secondary-default)'
      : 'var(--bg-comment-neutral-default)'};
`;

export const HeaderWrapper = styled(Stack).attrs((props) => ({
  ...props,
  justify: 'space-between',
}))``;

export const TipWrapper = styled(Stack).attrs((props) => ({
  ...props,
  align: 'center',
  gap: 12,
}))``;
