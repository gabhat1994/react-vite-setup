import styled from 'styled-components';
import { sizes } from '@/constants/devices';

export const StickyWrapper = styled.div<{
  leftNav?: boolean;
  isSticky?: boolean;
  height: number;
  $isAppUiV2: boolean;
}>`
  @media (min-width: ${sizes.LAPTOP}) {
    ${({ isSticky, $isAppUiV2 }) =>
      isSticky &&
      `
        position: sticky; 
        top: ${$isAppUiV2 ? '24px' : '96px'};
      `};
    ${({ leftNav }) => (leftNav ? `left: 40px;` : '')};
    ${({ height }) => (height ? `height: ${height}px;` : 'auto')};
  }
`;
