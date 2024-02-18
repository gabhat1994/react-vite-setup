import styled from 'styled-components';

import { mediaSizes, sizes } from '@/constants/devices';

export const Container = styled.div`
  margin: 0 auto;

  @media (max-width: ${sizes.LAPTOP}) {
    &:last-child {
      margin-bottom: 65px;
    }
  }
  @media (max-width: ${mediaSizes.MOBILE_S_MAX}) and (min-width: ${mediaSizes.MOBILE_S_MIN}) {
    width: calc(100vw);
  }
  @media (max-width: ${mediaSizes.MOBILE_M_MAX}) and (min-width: ${mediaSizes.MOBILE_M_MIN}) {
    width: calc(100vw);
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) and (min-width: ${mediaSizes.MOBILE_L_MIN}) {
    width: calc(100vw);
    &:last-child {
      margin-bottom: 80px;
    }
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) and (min-width: ${mediaSizes.TABLET_MIN}) {
    width: calc(100vw - 32px);
  }
  @media (max-width: ${mediaSizes.LAPTOP_MAX}) and (min-width: ${mediaSizes.LAPTOP_MIN}) {
    width: calc(100vw - 200px);
  }
  @media (max-width: ${mediaSizes.LAPTOP_L_MAX}) and (min-width: ${mediaSizes.LAPTOP_L_MIN}) {
    width: 1236px;
  }
  @media (min-width: ${sizes.DESKTOP}) {
    width: calc(100vw - 200px);
    max-width: 1236px;
  }
`;

export const ShowAllHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 16px;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    padding: 0 16px;
  }
`;
