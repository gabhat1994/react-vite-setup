import { t } from 'i18next';
import { type CSSProperties, useRef, useState } from 'react';

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useBreakpoints } from '@/hooks';
import { cleanList } from '@/utils/list';
import { Button } from '@/components/Button';
import { Occurrences } from '@/utils/recurringEventOccurance';
import type { DropdownValueType } from '@/components/Dropdown';
import { useCreateEditEventContext } from '@/features/events/contexts';
import { Frequency, type WeekDays } from '@/apollo/generated/types';

import {
  getDayToDate,
  getIntervalTitle,
  getUpdatedMonthDates,
  getUpdatedWeekDays,
} from './utils';
import { customOccurrences } from '../../constants/eventCustomRepeat';
import { FrequencyPicker } from './FrequencyPicker';
import { IntervalInput } from './IntervalInput';
import { WeekDaysSelector } from './WeekDaysSelector';
import { MonthlyPicker } from './MonthlyPicker';
import type { EventCustomRepeatPickerProps } from './types';

export const EventCustomRepeat = ({
  onClose,
  onCancel,
  onSubmit,
  isNoumEditor,
  frequency,
}: EventCustomRepeatPickerProps) => {
  const {
    weekDays,
    interval,
    monthDates,
    setWeekDays,
    setFrequency,
    setMonthDates,
    setEventInterval,
    setIsCustomRepeat,
  } = useCreateEditEventContext();

  const [selectedInterval, setSelectedInterval] = useState(interval);

  const [selectedMonthDates, setSelectedMonthDates] = useState<Date[]>(
    getDayToDate(cleanList(monthDates)),
  );

  const [selectedWeekDays, setSelectedWeekDays] =
    useState<WeekDays[]>(weekDays);

  const [selectedFrequency, setSelectedFrequency] =
    useState<DropdownValueType<Frequency | string>>();

  const matchingOccurrence = customOccurrences.find(
    ({ value }) => value === frequency,
  ) as DropdownValueType<Frequency>;

  const defaultFrequency = selectedFrequency || matchingOccurrence;

  const { isMobile } = useBreakpoints();
  const modalRef = useRef<HTMLDivElement>(null);

  const onSubmitHandler = () => {
    setIsCustomRepeat(true);
    setEventInterval(selectedInterval);
    setWeekDays(selectedWeekDays);
    setMonthDates(selectedMonthDates.map((date) => date.getDate()));
    setFrequency(defaultFrequency.value);
    onSubmit();
  };

  const getIsValidForm = () => {
    if (!interval) {
      return false;
    }
    if (defaultFrequency.value === Frequency.Weekly) {
      return !!selectedWeekDays?.length;
    }

    if (defaultFrequency.value === Frequency.Monthly) {
      return !!selectedMonthDates?.length;
    }
    return true;
  };

  const onWeekDayChange = (day: WeekDays) => {
    const days = getUpdatedWeekDays(day, selectedWeekDays);
    setSelectedWeekDays(days);
  };

  const onMonthDateChange = (date: Date | null) => {
    const days = getUpdatedMonthDates(date, selectedMonthDates);
    setSelectedMonthDates(days);
  };

  const modalCalcStyle: CSSProperties = {
    width: 450,
  };

  const onChangeFrequency = (
    updatedFrequency: DropdownValueType<Frequency | string>,
  ) => {
    setSelectedFrequency(updatedFrequency);
    setSelectedMonthDates([]);
    setSelectedWeekDays([]);
    setSelectedMonthDates([]);
    if (updatedFrequency.value.toString() === Frequency.Monthly) {
      onMonthDateChange(monthDates.length ? null : new Date());
    }
  };

  const selectedFrequencyLabel =
    typeof defaultFrequency.label === 'string' ? defaultFrequency.label : '';

  return (
    <Modal
      disableBackdropClick
      targetRef={modalRef}
      style={modalCalcStyle}
      isScrollableContent={true}
      disableEscapeKeyDown={false}
      isFullScreen={!!isMobile}
      overlayVariant={isNoumEditor ? 'light' : 'none'}
      testId="event-custom-repeat-modal"
      open={true}
      enableCloseButton
      onClose={onClose}
      size={ModalSize.XL}
    >
      <ModalHeader topPadding={0}>
        {t('noumena.event.custom_repeat_heading')}
      </ModalHeader>
      <ModalBody>
        <FrequencyPicker
          value={selectedFrequencyLabel}
          onChange={onChangeFrequency}
        />
        <IntervalInput
          heading={getIntervalTitle(defaultFrequency.value)}
          value={selectedInterval}
          onChange={setSelectedInterval}
        />
        {selectedFrequencyLabel === Occurrences.Weekly && (
          <WeekDaysSelector
            value={selectedWeekDays}
            onChange={onWeekDayChange}
          />
        )}
        {selectedFrequencyLabel === Occurrences.Monthly && (
          <MonthlyPicker
            value={selectedMonthDates}
            onChange={onMonthDateChange}
          />
        )}
      </ModalBody>
      <ModalFooter gap={16}>
        <Button tertiary size="full" onClick={onCancel}>
          {t('noumena.event.custom_cancel_btn')}
        </Button>
        <Button
          primary
          size="full"
          onClick={onSubmitHandler}
          disabled={!getIsValidForm()}
        >
          {t('noumena.event.custom_confirm_btn')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
