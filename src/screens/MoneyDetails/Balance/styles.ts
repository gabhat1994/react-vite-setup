import styled from 'styled-components';
import { devices } from '@/constants/devices';
import { Card } from '@/components/Card';

export const BalanceWrapper = styled(Card)<{ isMobile: boolean }>`
  border-radius: 0;
  width: 100%;
  padding: ${(props) => (props.isMobile ? '16px' : '24px')};
  font-family: var(--font-family);
  @media ${devices.TABLET} {
    border-radius: 16px;
  }
`;
