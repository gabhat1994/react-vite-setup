import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';

const PaymentSideBarWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: ${mediaSizes.LAPTOP_M_MAX}) {
    width: 300px;
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    display: none;
  }
`;
export default PaymentSideBarWrapper;
