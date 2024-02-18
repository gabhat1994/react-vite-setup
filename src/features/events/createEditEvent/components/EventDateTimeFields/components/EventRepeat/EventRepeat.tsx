import { t } from 'i18next';
import { useState } from 'react';

import {
  availableOccurrences,
  singleOccurance,
} from '@/utils/recurringEventOccurance';
import { Spacer } from '@/layout';
import type { Frequency } from '@/apollo/generated/types';
import type { DropdownValueType } from '@/components/Dropdown';
import { useCreateEditEventContext } from '@/features/events/contexts';
import { useRecurringLabel } from '@/features/events/hooks/useRecurringLabel';
import { dailyCustomOccurrence } from '@/features/events/createEditEvent/constants';
import { EventCustomOccurrenceContainer } from '@/features/events/createEditEvent/styles';

import { EventSummary } from '../../../EventSummary';
import { EventRepeatPicker } from './EventRepeatPicker';
import { EventRepeatWrapper, Container } from './styles';
import { EventCustomRepeat } from '../../../EventCustomRepeat';

export const EventRepeat = () => {
  const {
    interval,
    weekDays,
    frequency,
    monthDates,
    setWeekDays,
    setFrequency,
    setMonthDates,
    isCustomRepeat,
    setIsCustomRepeat,
    setEventInterval,
  } = useCreateEditEventContext();

  const [showCustomRepeat, setShowCustomRepeat] = useState(false);

  const recurringLabel = useRecurringLabel({
    recurringDetails: {
      weekDays,
      monthDates,
      interval,
      custom: isCustomRepeat,
      frequency: frequency as Frequency,
    },
    isShortHand: false,
    isCustomModalOpen: showCustomRepeat,
  });

  const onResetPrevSelection = () => {
    setIsCustomRepeat(false);
    setEventInterval(1);
    setWeekDays([]);
    setMonthDates([]);
  };

  const onFrequencyChanged = (
    option: DropdownValueType<Frequency | string>,
  ) => {
    if (!option.value.toLowerCase().includes('custom')) {
      onResetPrevSelection();
      setFrequency(option.value);
    }
  };

  const onCloseCustomModal = () => setShowCustomRepeat(false);

  return (
    <Container data-testid="event-repeat-wrapper">
      <EventRepeatWrapper>
        <EventRepeatPicker
          isNoumEditor={true}
          frequency={frequency}
          defaultValue={recurringLabel}
          label={t('noumena.event.custom_repeat')}
          availableOccurrences={[singleOccurance, ...availableOccurrences]}
          onOpenCustomModal={() => setShowCustomRepeat(true)}
          onFrequencyChanged={onFrequencyChanged}
        />
        {showCustomRepeat && (
          <EventCustomOccurrenceContainer>
            <EventCustomRepeat
              isNoumEditor={true}
              frequency={
                !isCustomRepeat ? dailyCustomOccurrence.value : frequency
              }
              onClose={onCloseCustomModal}
              onSubmit={onCloseCustomModal}
              onCancel={onCloseCustomModal}
            />
          </EventCustomOccurrenceContainer>
        )}
        <Spacer height={16} />
        <EventSummary />
      </EventRepeatWrapper>
    </Container>
  );
};
