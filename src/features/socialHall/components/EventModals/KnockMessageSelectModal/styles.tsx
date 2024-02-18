import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

export const Description = styled.div<{ isLast: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-bottom: ${({ isLast }) =>
    isLast ? 'none' : '1px solid var(--bg-separator-neutral-default)'};
  padding: 20px 0;
  gap: 16px;
  cursor: pointer;
`;

export const DescriptionSpan = styled(TSpan)`
  flex: 1;
`;
