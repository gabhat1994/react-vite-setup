import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';

const PaymentSideBarWrapper = styled.div`
  width: 288px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    display: none;
  }
`;
export default PaymentSideBarWrapper;
