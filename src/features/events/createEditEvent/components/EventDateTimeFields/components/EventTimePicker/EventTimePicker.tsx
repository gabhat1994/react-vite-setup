import { useState } from 'react';

import { EventPicker } from '../../../EventPicker';
import type { EventTimePickerProps } from '../../types';
import { EventTimePickerContainer } from './styles';

export const EventTimePicker = ({
  time,
  availableTimes,
  error,
  onChange,
}: EventTimePickerProps) => {
  const [timeError, setTimeError] = useState<boolean>(false);

  return (
    <EventTimePickerContainer data-testid="event-time-picker-container">
      <EventPicker
        value={time}
        selectedLabel={time}
        options={availableTimes}
        placeholder="HH:MM AM/PM"
        error={error || timeError}
        inputStyle={{ textTransform: 'uppercase' }}
        onOptionChange={({ value }) => {
          setTimeError(false);
          onChange(value);
        }}
      />
    </EventTimePickerContainer>
  );
};
