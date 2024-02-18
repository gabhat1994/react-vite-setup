import { Stack } from '@/layout';
import styled from 'styled-components';

export const Wrapper = styled(Stack)`
  border-radius: 16px;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
`;

export const NoumImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 6px;
`;
