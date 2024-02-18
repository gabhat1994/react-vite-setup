import { last } from 'lodash';
import { useMemo, useState } from 'react';

import { valueToTimeStr } from '@/utils/date';
import { useEventDuration } from '@/features/events/hooks';
import type { DropdownValueType } from '@/components/Dropdown';
import { DropDownIcon } from '@/features/events/styles/DropDownIcon';
import { useCreateEditEventContext } from '@/features/events/contexts';

import {
  TimeInput,
  EventTimeOption,
  EventTimeOptionLabel,
  EventDurationPickerContainer,
  EventTimesOptionRendererContainer,
} from './styles';
import { EventPicker } from '../../../EventPicker';
import { DEFAULT_EVENT_DURATION } from '../../../../const';

export const EventDurationPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { eventDate, setDuration, event } = useCreateEditEventContext();

  const { duration, durations, onChangeDuration } = useEventDuration({
    dateTime: eventDate ?? new Date(),
    initialDuration: event?.duration ?? DEFAULT_EVENT_DURATION,
    onChange: setDuration,
  });

  const updatedDuration = useMemo(
    () => valueToTimeStr(duration, 'seconds') ?? '',
    [duration],
  );

  const label = useMemo(
    () =>
      durations.find(({ value }) => value === duration)?.description ??
      last(durations)?.description,
    [durations, duration],
  );

  return (
    <EventDurationPickerContainer data-testid="even-duration-picker-container">
      <EventPicker
        value={updatedDuration}
        placeholder="HH:MM"
        options={durations}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onOptionChange={(option: DropdownValueType<number>) => {
          onChangeDuration(option.value || 1);
        }}
        optionsRenderer={(options, handleSelectOption) => (
          <EventTimesOptionRendererContainer vertical scrollbarWidth={5}>
            {options.map(
              (option) =>
                option.type === 'value' && (
                  <EventTimeOption
                    key={option.key}
                    onClick={() => {
                      handleSelectOption(option);
                      onChangeDuration(option.value);
                    }}
                  >
                    <EventTimeOptionLabel
                      font="body-m-bold"
                      colorToken="--text-tablecell-header-neutral-highlighted"
                    >
                      {option.description}
                    </EventTimeOptionLabel>
                  </EventTimeOption>
                ),
            )}
          </EventTimesOptionRendererContainer>
        )}
      >
        {({ inputRef, inputProps, toggle }) => (
          <TimeInput
            ref={inputRef}
            {...inputProps}
            placeholder="HH:MM"
            value={label}
            rightIcon={
              <DropDownIcon
                name="chevron_down_m"
                isOpen={isOpen}
                size={16}
                onClick={toggle}
                color="--icon-input-neutral-default"
              />
            }
          />
        )}
      </EventPicker>
    </EventDurationPickerContainer>
  );
};
