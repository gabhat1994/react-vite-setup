import styled from 'styled-components';
import { devices, mediaSizes } from '@/constants/devices';
import { ResponsiveContainer } from '../ResponsiveContainer';
import { Stack } from '../Stack';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-body-neutral-alt-highlighted);
`;

const Main = styled.div`
  display: grid;
  justify-content: center;
  gap: 0;

  @media ${devices.MOBILE_S} {
    padding: 0;
  }

  @media ${devices.LAPTOP} {
    padding: 24px 40px 55px;
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    padding-top: 48px;
  }

  @media (min-width: ${mediaSizes.LAPTOP_MIN}) {
    grid-template-columns: auto 783px;
    grid-column-gap: 0;
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) and (min-width: ${mediaSizes.MOBILE_S_MIN}) {
    grid-template-columns: 1fr;
  }
`;

const FullHeightMain = styled(Stack).attrs(() => ({
  grow: 1,
  vertical: true,
  align: 'stretch',
  justify: 'stretch',
}))`
  height: 100%;
  overflow-y: hidden;
`;

const ResponsiveMain = styled(ResponsiveContainer)`
  padding: 16px 0 32px;

  @media ${devices.TABLET} {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media ${devices.LAPTOP} {
    padding-left: 40px;
    padding-right: 40px;
  }
`;

export default {
  Container,
  Main,
  FullHeightMain,
  ResponsiveMain,
};
