import React from 'react';
import type { Frequency } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';
import { singleOccurance } from '@/utils/recurringEventOccurance';

import { Stack } from '@/layout';
import { EventPicker } from '../../../EventPicker';
import type { EventRepeatPickerProps } from '../../types';

export const EventRepeatPicker = React.forwardRef<
  HTMLDivElement,
  EventRepeatPickerProps
>(
  (
    {
      label,
      frequency,
      defaultValue,
      isNoumEditor,
      onFrequencyChanged,
      availableOccurrences,
      onOpenCustomModal,
    },
    ref,
  ) => {
    const onOptionSelected = (
      option: DropdownValueType<Frequency | string>,
    ) => {
      if (option.value.includes('Custom')) {
        onOpenCustomModal();
      }
      onFrequencyChanged(option);
    };

    const selectedFrequency = (
      defaultValue || singleOccurance.label
    )?.toString();

    return (
      <Stack data-testid="event-repeat-picker-container" ref={ref}>
        <EventPicker
          label={label}
          selectedLabel={selectedFrequency}
          value={frequency ?? ''}
          options={availableOccurrences}
          onOptionChange={onOptionSelected}
          containerWidth={isNoumEditor ? '' : '240px'}
        />
      </Stack>
    );
  },
);
