import styled from 'styled-components';

import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { TextField } from '@/components/TextField';

export const EventTimesOptionRendererContainer = styled(Stack)`
  position: relative;
  overflow-y: auto;
  align-items: stretch;
`;

export const EventDurationPickerContainer = styled(Stack).attrs({
  grow: 1,
  basis: '0',
})`
  max-width: auto;
`;

export const EventTimeOption = styled.div`
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
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

  position: relative;

  &:last-child {
    border-bottom: none;
  }
`;

export const EventTimeOptionLabel = styled(TSpan)`
  min-width: 40px;
`;

export const TimeInput = styled(TextField)`
  text-transform: capitalize;
`;
