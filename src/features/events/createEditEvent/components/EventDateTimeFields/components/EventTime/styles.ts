import styled from 'styled-components';

import { Stack } from '@/layout';
import { sizes } from '@/constants/devices';
import { EventFieldRow } from '@/features/events/styles';
import { DatePickerWrapper } from '@/components/DatePicker/styles';
import { EventTimePickerContainer } from '../EventTimePicker/styles';

export const Container = styled(EventFieldRow)`
  padding: 0;
  flex: 1;
  border: none;
`;

export const TimePickerContainer = styled(Stack)`
  ${EventTimePickerContainer} {
    width: auto;
    display: flex;
    flex: 1;
  }
`;

export const DateTimeContainer = styled(Stack)`
  ${DatePickerWrapper} {
    flex: 1;
    display: flex;
    width: 100%;
  }
  @media (min-width: ${sizes.TABLET}) {
    flex-direction: row;
  }
`;

export const StartToEndTimeLabel = styled.div`
  margin: 0 8px;
`;

export const DateTimeSeparator = styled.div`
  margin-top: 16px;
  @media (min-width: ${sizes.TABLET}) {
    margin: 0 16px;
    width: 1px;
    height: 56px;
    background: var(--bg-separator-neutral-default);
  }
`;
