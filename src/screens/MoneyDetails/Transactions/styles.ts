import styled from 'styled-components';
import { Card } from '@/components/Card';
import { devices } from '@/constants/devices';
import { TSpan } from '@/components/Typography';

export const CardWrapper = styled(Card)<{
  isMobile: boolean;
  isTablet: boolean;
}>`
  border-radius: 0;
  min-height: 140px;
  flex: 1;
  box-sizing: border-box;
  display: flex;
  padding: ${(props) =>
    props.isMobile ? '16px 16px' : props.isTablet ? '16px 8px' : '24px'};
  @media ${devices.TABLET} {
    border-radius: 16px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  padding-bottom: 16px;
`;
export const CardInformation = styled(TSpan)`
  font-weight: 600;
  font-size: 20px;
  line-height: 30%;
  text-align: center;
  font-family: var(--font-family);
`;

export const SeeAllButton = styled.div`
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  color: var(--text-button-brand-primary-default);
  font-family: var(--font-family);
  line-height: 22.4px;
  text-align: center;
  align-self: center;
  margin: auto;
  cursor: pointer;
`;

export const NoTransactions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 248px;
`;

export const Separator = styled.div`
  height: 1px;
  width: 100%;
  background: var(--bg-separator-neutral-default);
`;
