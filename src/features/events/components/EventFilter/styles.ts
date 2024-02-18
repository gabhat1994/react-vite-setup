import styled from 'styled-components';

import { devices } from '@/constants/devices';
import { Stack } from '@/layout';

export const EventFiltersWrapper = styled.div<{ isCalendar?: boolean }>`
  display: flex;
  align-items: center;
  ${({ isCalendar }) => !isCalendar && 'overflow-x: auto;'}

  & > form {
    gap: 11px;
    margin-bottom: 8px;

    @media ${devices.TABLET} {
      margin-bottom: 2px;
    }

    & > div {
      margin: 0;
      padding: 0;
    }
  }
  div {
    ${({ isCalendar }) => isCalendar && 'padding: 0'}
  }
`;

export const EventFilterDropdownButton = styled(Stack)`
  background: var(--bg-input-neutral-default);
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
`;
