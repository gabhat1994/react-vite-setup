import styled from 'styled-components';

import { footnote } from '@/components/Typography/Typography';

export const EventAttendeesWrapper = styled.div<{ notClickable?: boolean }>`
  display: flex;
  flex-direction: row;
  flex: none;
  align-items: center;
  white-space: break-spaces;
  padding-top: 16px;
  order: 4;
  width: 100%;
  box-sizing: border-box;
  cursor: ${({ notClickable }) => (notClickable ? 'cursor' : 'pointer')};
`;

export const EventAttendeesNote = styled.span<{
  color?: string;
  paddingLeft?: number;
}>`
  ${({ paddingLeft }) => paddingLeft && 'padding-left: 8px;'}
  ${({ color }) =>
    color === 'gray'
      ? `color: var(--text-card-neutral-default);`
      : `color: var(--text-card-neutral-highlighted);`}
  ${footnote}
`;
