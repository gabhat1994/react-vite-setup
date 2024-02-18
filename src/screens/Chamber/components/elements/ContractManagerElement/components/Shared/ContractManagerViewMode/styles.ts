import { Stack } from '@/layout';
import styled from 'styled-components';

export const FilterContainer = styled.div`
  padding: 0 14px;
`;

export const CustomHeadContainer = styled(Stack)<{ isTablet: boolean }>`
  position: absolute;
  min-height: 40px;
  padding: 0 14px;
  z-index: 9;
  ${({ isTablet }) =>
    isTablet
      ? 'justify-content: end; flex-direction: row-reverse'
      : 'justify-content: space-between; padding-right: 102px'};
`;
