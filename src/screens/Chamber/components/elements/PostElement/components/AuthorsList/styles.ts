import styled from 'styled-components';
import { flexRow, noScrollBar } from '@/common/globalStyles';
import { TSpan } from '@/components/Typography';
import { Chips } from '@/components/Chips/Chips';
import { Stack } from '@/layout';

export const Container = styled(Stack)`
  box-sizing: border-box;
  gap: 12px;
  width: 100%;
  overflow-y: hidden;
  ${noScrollBar}
`;

export const AllTab = styled(Chips)<{
  isDisabled?: boolean;
}>`
  background: none;
  border-radius: 0;
  ${({ isDisabled }) =>
    !isDisabled
      ? `border-bottom: 2px solid var(--text-tab-chips-brand-primary-selected);`
      : `border-bottom: 2px solid transparent;`}
`;

export const UserFrame = styled.div`
  ${flexRow}
  gap: 16px;
`;

export const MoreText = styled(TSpan)`
  padding-left: 8px;
`;
