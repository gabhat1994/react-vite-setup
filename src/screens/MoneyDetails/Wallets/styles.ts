import styled from 'styled-components';
import { devices } from '@/constants/devices';
import { Card } from '@/components/Card';

export const WalletWrapper = styled(Card)<{ isMobile: boolean }>`
  border-radius: 0;
  width: 100%;
  padding: ${(props) => (props.isMobile ? '0px' : '24px')};
  @media ${devices.TABLET} {
    border-radius: 16px;
  }
`;
export const BalanceContainer = styled.div`
  display: flex;
  text-align: center;
  height: 100%;
`;

export const WalletContainer = styled.div<{ isMobile: boolean }>`
  border-radius: ${(props) => (props.isMobile ? '0px' : '16px')};
  border: 1px solid var(--border-card-neutral-highlighted);
  padding: 16px;
`;

export const Profile = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 10px;
`;
export const ProfileWarpper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
