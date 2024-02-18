import { Stack } from '@/layout';
import styled from 'styled-components';

export const Container = styled(Stack).attrs({
  vertical: true,
})`
  gap: 16px;
`;

export const AllPosts = styled(Stack)<{ opacity: number }>`
  gap: 16px;
  width: 100%;
  flex-direction: column;
  opacity: ${({ opacity }) => opacity};
`;

export const AllPostsButtonContainer = styled(Stack)`
  width: 100%;
  justify-content: center;
  border-top: solid 1px var(--border-card-neutral-default);
  padding-top: 16px;
`;
