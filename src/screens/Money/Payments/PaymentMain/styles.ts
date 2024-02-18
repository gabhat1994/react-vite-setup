import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';

export const PaymentMainWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  @media (min-width: 1024px) {
    display: none;
  }
  flex-direction: column;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    flex-direction: column;
  }
`;

export const WalletWrapper = styled.div<{ isTablet: boolean }>`
  display: flex;
  flex-grow: 1;
  // width: ${({ isTablet }) => (isTablet ? '50%' : '100%')};
  width: 100%;
  flex-direction: ${({ isTablet }) => (isTablet ? 'row' : 'column')};
  gap: 16px;
`;
export const CQTokenWrapper = styled.div<{ isTablet: boolean }>`
  flex-grow: 1;
  display: flex;
  flex-direction: ${({ isTablet }) => (isTablet ? 'row' : 'column')};
  gap: 16px;
`;
