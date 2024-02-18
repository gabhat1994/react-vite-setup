import styled from 'styled-components';
import { Card } from '@/components/Card';
import { mediaSizes } from '@/constants/devices';

export const Wrapper = styled(Card)`
  width: 100%;
  min-height: 294px;
  box-sizing: border-box;
  padding: 24px;
  gap: 24px;
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
  }
`;
