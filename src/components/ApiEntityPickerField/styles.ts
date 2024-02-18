import styled from 'styled-components';
import { TextField } from '@/components/TextField';
import { Stack } from '@/layout';
import { type InputSize } from '../TextField/types';

export const SearchField = styled(TextField)`
  svg path {
    fill: var(--icon-input-neutral-default);
  }
`;
export const SelectedItemHeader = styled.div<{ $inputSize?: InputSize }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: ${(props) => (props.$inputSize === 'small' ? '4px 12px' : '16px')};
  min-height: 40px;
  background: var(--bg-tablecell-neutral-pressed);
  border-radius: 8px;
  gap: 16px;
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const SelectedItem = styled.div<{ $fullWidth?: boolean }>`
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
`;

export const SelectedRightColumn = styled(Stack).attrs(() => ({
  gap: 8,
  align: 'center',
}))``;
