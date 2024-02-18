import styled from 'styled-components';

import { Stack } from '@/layout';
import { TSpan } from '@/components';
import { TextField } from '@/components/TextField';

export const Option = styled(Stack)`
  padding: 12px;
  gap: 12px;
  user-select: none;
  transition: background-color 0.1s ease-in-out;
  outline: none;
  cursor: pointer;
  border-bottom: 1px solid var(--bg-separator-neutral-default);

  &:last-of-type {
    border-bottom-color: transparent;
  }
  &:hover {
    background-color: var(--bg-tablecell-neutral-hover);
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const Capitalize = styled(TextField)`
  text-transform: capitalize;
  cursor: pointer;
  :hover {
    background-color: var(--bg-button-neutral-alt-hover);
  }
`;

export const OptionLabel = styled(TSpan)`
  min-width: 40px;
`;

export const Content = styled(Stack)`
  position: relative;
  overflow-y: auto;
  align-items: stretch;
`;
