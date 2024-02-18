import styled from 'styled-components';
import { NoumLayoutViewMode } from '@/features/conversation/types';

export const Wrapper = styled.div<{ noumLayoutViewMode?: NoumLayoutViewMode }>`
  ${({ noumLayoutViewMode }) =>
    noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTCOMPACT
      ? undefined
      : 'width: 100%;'}
  display: flex;
  align-items: center;
  gap: 12px;
`;
