import styled from 'styled-components';
import { TSpan } from '@/components/Typography';


export const DateFieldsContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid var(--border-card-neutral-default);
`;

export const ButtonWrapper = styled.div<{ flexDirection?: 'column' | 'row' }>`
  display: flex;
  margin-top: 16px;
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'row'};
  justify-content: flex-end;
`;

export const StyledTimeFrameTitle = styled(TSpan)`
  padding: 16px 16px 0px 16px;
  display: block;
`;