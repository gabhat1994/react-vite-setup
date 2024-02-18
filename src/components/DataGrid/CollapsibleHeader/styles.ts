import styled from 'styled-components';
import { Stack } from '@/layout';

export const HeaderContent = styled(Stack)<{ width?: string }>`
  width: ${({ width }) => width || 'auto'};
`;
