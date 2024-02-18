import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';
import { GLOBAL_SEARCH_DROPDOWN_MAX_WIDTH } from '@/features/globalSearch/components/GlobalSearch';
import { Stack, StackItem } from '../Stack';
import { type AppLayoutBackground } from './types';

const getBackgroundColor = (background: AppLayoutBackground) => {
  switch (background) {
    case 'neutral':
      return '--bg-card-neutral-default';
    case 'neutral-alt':
      return '--bg-card-neutral-alt-default';
    case 'neutral-alt-highlighted':
      return '--bg-body-neutral-alt-highlighted';
    default:
      return '--bg-card-neutral-default';
  }
};

export const LayoutContainer = styled(Stack).attrs(() => ({
  justify: 'stretch',
  align: 'stretch',
  vertical: true,
  fullWidth: true,
}))<{ $background: AppLayoutBackground }>`
  background: var(${(props) => getBackgroundColor(props.$background)}) fixed;
  font-family: var(--font-family);
  height: 100vh;
  // Wherever supported, use dvh to correctly calculate available space on Apple devices.
  height: 100dvh;
  overflow: hidden;
  scrollbar-gutter: auto;
`;

export const LayoutBody = styled(Stack).attrs(() => ({
  grow: true,
  justify: 'stretch',
  align: 'stretch',
}))`
  overflow-y: hidden;
  scrollbar-gutter: auto;
`;

export const LayoutMainContent = styled(StackItem).attrs(() => ({
  grow: true,
}))`
  overflow-y: scroll;
  position: relative;
`;

export const MainContentContainer = styled(StackItem).attrs(() => ({
  grow: true,
}))`
  padding: 16px;
  max-width: 100vw;

  @media (min-width: ${mediaSizes.TABLET_MIN}) and (max-width: ${mediaSizes.TABLET_MAX}) {
    padding: 16px 24px;
  }

  @media (min-width: ${mediaSizes.LAPTOP_MIN}) {
    padding: 24px 40px;
  }

  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    padding: 16px 0;
  }
`;

export const MainContentBody = styled.div<{ $fullWidth: boolean }>`
  margin: 0;

  ${(props) =>
    !props.$fullWidth &&
    `
    max-width: 1440px;
    
    @media (min-width: ${mediaSizes.LAPTOP_L_MIN}) {
      margin: 0 auto;
    }
  `}
`;

export const TopBarExpandedSearchWrapper = styled.div`
  margin: 0 8px;
  flex-grow: 1;
  max-width: ${GLOBAL_SEARCH_DROPDOWN_MAX_WIDTH}px;
`;
