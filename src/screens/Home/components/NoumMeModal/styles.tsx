import styled from 'styled-components';
import { sizes } from '@/constants/devices';

export const StyledChamberCompletenessWrapper = styled.div`
  width: 100%;
  @media (min-width: ${sizes.TABLET_L}) {
    margin: 0 auto;
    width: 400px;
  }
`;
