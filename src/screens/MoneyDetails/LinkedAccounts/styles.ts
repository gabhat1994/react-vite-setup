import styled from 'styled-components';
import { devices } from '@/constants/devices';
import { Card } from '@/components/Card';
import { TSpan } from '@/components/Typography';

export const LinkedAccountsWrapper = styled(Card)<{ isMobile: boolean }>`
  border-radius: 0;
  width: 100%;
  padding: ${(props) => (props.isMobile ? '0px' : '24px')};
  margin-bottom: 16px;
  @media ${devices.TABLET} {
    border-radius: 16px;
  }
`;

export const CardWrapper = styled(Card)`
  border-radius: 0;
  min-height: 140px;
  max-height: 450px;
  flex: 1;
  box-sizing: border-box;
  padding 0px;
  @media ${devices.TABLET} {
    border-radius: 16px;
  }
`;

export const BankContainer = styled.div<{
  isMobile: boolean;
  hasDottedBorder: boolean;
}>`
  border-radius: ${(props) => (props.isMobile ? '0px' : '16px')};
  border: ${(props) =>
    props.hasDottedBorder
      ? '1px dashed var(--border-card-neutral-highlighted)'
      : '1px solid var(--border-card-neutral-highlighted)'};
  padding: 15px;
  margin-top: 10px;
`;

export const BankDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const HelperText = styled(TSpan)`
  text-align: center;
`;

export const WalletLogo = styled.img`
  width: 80px;
  height: 80px;
`;
export const Profile = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 12px;
  margin-right: 5px;
`;
export const ProfileWarpper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuItem = styled(TSpan)``;

export const StatusWraper = styled.div<{ isFailed?: boolean }>`
  display: flex;
  height: 24px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 1000px;
  background: ${(props) =>
    props.isFailed
      ? 'var(--bg-badge-danger-secondary-default)'
      : 'var(--bg-badge-danger-warning-secondary)'};
`;

export const DropDowItemWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;
