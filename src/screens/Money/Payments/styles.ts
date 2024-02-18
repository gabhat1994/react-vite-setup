import styled from 'styled-components';
import { Card } from '@/components/Card';
import { TSpan } from '@/components/Typography';

export const WalletWrapper = styled.div`
  flex-grow: 1;
  overflow: hidden;
  display: flex;
`;
export const CardWrapper = styled(Card)`
  border-radius: 16px;
  flex-grow: 1;
  display: flex;
  box-sizing: border-box;
  padding: 16px;
  @media (max-width: 1023px) {
    border-radius: 16px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardInformation = styled(TSpan)`
  text-align: center;
  width: 256px;
  height: 24px;
`;

export const ContentWrapper = styled.div`
  padding-top: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 1023px) {
    // height:100%;
    // width :50%;
    // align-self:center
  }
`;

export const HelperText = styled(TSpan)`
  text-align: center;
`;

export const HelperTextWrapper = styled(TSpan)`
  font-style: normal;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  // gap: 5px;
`;

export const WarningTextWrapper = styled(TSpan)`
  text-align: center;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
export const TextWraaper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-left: 16px;
  padding-bottom: 16px;
`;

export const SetupWalletButton = styled.div`
  width: 100%;
  border-radius: 16px;
  padding-top: 16px;
`;

export const RefreshLink = styled(TSpan)`
  cursor: pointer;
  color: var(--text-button-brand-secondary-default);
  font-weight: bold;
`;

export const EmptyWalletCard = styled(Card)`
  width: 100%;
  height: 247px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
