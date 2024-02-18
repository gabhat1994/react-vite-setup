import { mediaSizes } from '@/constants/devices';
import styled from 'styled-components';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  grid-gap: 16px;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default {
  StatsGrid,
};
