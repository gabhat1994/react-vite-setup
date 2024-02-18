import styled from 'styled-components';
import { mediaSizes, mediaSizesForNoumLayout } from '@/constants/devices';

export const Root = styled.div`
  display: flex;
  justify-content: center;
`;

export const Header = styled.div<{ topSpacing?: boolean }>`
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    padding-top: ${({ topSpacing }) => (topSpacing ? '48px' : '0px')};
  }

  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    padding-top: ${({ topSpacing }) => (topSpacing ? '68px' : '0px')};
  }
`;

export const MainNoumLayout = styled.div<{
  hasThemePanel?: boolean;
  isStickyContainer?: boolean;
}>`
  box-sizing: border-box;
  display: grid;
  #header {
    grid-area: header;
    padding: 0 4px;
  }
  #sidebar {
    grid-area: sidebar;
  }
  #body {
    grid-area: body;
    overflow: visible;
    padding: 4px;
  }
  transition: all ease-in-out 0.25s;
  width: 100%;
  padding-top: 14px;
  grid-template-columns: 1fr;
  grid-template-rows:
    auto
    auto
    auto;
  grid-template-areas:
    'header'
    'sidebar'
    'body';
  ${({ isStickyContainer }) => isStickyContainer && 'margin-top: 69px'};
  @media (min-width: ${mediaSizesForNoumLayout.LAPTOP_S_MIN}) {
    width: 100%;
    padding: 24px;
    grid-template-columns: 0 minmax(auto, 100%) ${({ hasThemePanel }) =>
        hasThemePanel ? '2fr' : '0'};
    grid-template-rows:
      auto
      auto
      auto;
    grid-template-areas:
      'space header sidebar'
      'space body sidebar'
      'space body .';
    &:has(.noums_container) {
      grid-template-columns: 0 minmax(auto, 100%) 238px;
    }
  }
  @media (min-width: ${mediaSizesForNoumLayout.LAPTOP_M_MIN}) {
    padding: 24px 40px;
    &:has(.theme_container) {
      grid-template-columns: 1fr calc(100% - 400px) 400px;
    }
    &:has(.noums_container) {
      grid-template-columns: 0 minmax(auto, 100%) 226px;
    }
    grid-template-rows:
      auto
      auto
      auto;
  }
  @media (min-width: ${mediaSizesForNoumLayout.LAPTOP_L_MIN}) {
    grid-template-columns: 1fr minmax(auto, 1360px) 1fr;
    &:has(.noums_container) {
      grid-template-columns: 0 minmax(auto, 100%) 226px;
    }
  }

  @media (min-width: ${mediaSizesForNoumLayout.LAPTOP_XL_MIN}) {
    grid-template-columns: 1fr 1360px 1fr;
    &:has(.noums_container) {
      grid-template-columns: 1fr 1360px 226px;
    }
  }
  @media (min-width: ${mediaSizesForNoumLayout.DESKTOP_MIN}) {
    &:has(.noums_container) {
      grid-template-columns: 1fr 1360px 1fr;
    }
  }

  @media (max-width: ${mediaSizes.TABLET_L}) {
    padding-top: 0;
    #header {
      padding: 0;
    }
    ${({ isStickyContainer }) => isStickyContainer && 'margin-top: 85px'};
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    display: block;
    ${({ isStickyContainer }) => isStickyContainer && 'margin-top: 165px'};
  }
`;
