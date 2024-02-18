import styled from 'styled-components';

import { Stack } from '@/layout';

export const Container = styled(Stack)`
  padding: 24px 0;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`;

export const HostContainer = styled(Stack)<{
  isOpen?: boolean;
  height: number;
}>`
  overflow: hidden;
  transition: max-height 0.6s ease;
  max-height: ${({ isOpen, height }) => (isOpen ? `${height}px` : 0)};
`;
