import styled from 'styled-components';
import { devices, mediaSizes } from '@/constants/devices';

const Container = styled.div<{ hasPadding: boolean }>`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;

  @media ${devices.TABLET} {
    ${({ hasPadding }) => hasPadding && `padding: 0 16px;`}
  }

  @media ${devices.LAPTOP} {
    ${({ hasPadding }) => hasPadding && `padding: 0 40px;`}
  }

  @media ${devices.LAPTOP_L} {
    width: ${mediaSizes.LAPTOP_L_MIN};
  }
`;

export default {
  Container,
};
