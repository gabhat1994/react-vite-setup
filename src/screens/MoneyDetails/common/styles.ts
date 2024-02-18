import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

export const BalanceContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMobile ? 'center' : 'left')};
  flex: 1;
`;

export const Amount = styled(TSpan)``;

export const SmallBalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  flex: 1;
`;

export const SmallAmount = styled(TSpan)``;

export const AmountContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
