import styled, { css } from 'styled-components';
import { devices, mediaSizes } from '@/constants/devices';
import { type GuestLayoutType } from './types';

export const Container = styled.div`
  font-family: var(--font-family);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-body-neutral-alt-highlighted);
`;

const Home = css`
  @media (min-width: ${mediaSizes.LAPTOP_MIN}) {
    grid-template-columns: 900px;
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) and (min-width: ${mediaSizes.MOBILE_S_MIN}) {
    grid-template-columns: 1fr;
  }
`;

export const Main = styled.div<{ type?: GuestLayoutType }>`
  display: grid;
  justify-content: center;
  gap: 0;

  @media ${devices.MOBILE_S} {
    padding: 16px 16px 0;
  }

  @media ${devices.LAPTOP} {
    padding: 24px 40px 0;
    gap: 24px;
  }

  ${({ type }) => type === 'Home' && Home}
`;
