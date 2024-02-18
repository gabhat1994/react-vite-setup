import { useMemo } from 'react';
import { cleanList } from '@/utils/list';
import { type Control, useController } from 'react-hook-form';

import type {
  CreateEventInput,
  Frequency,
  WeekDays,
} from '@/apollo/generated/types';

import { DEFAULT_EVENT_DURATION } from '../const';

export const useFormInputControl = (
  control: Control<CreateEventInput, object>,
) => {
  const { field: timezone } = useController({
    control,
    name: 'timezone',
  });

  const { field: eventDate } = useController({
    control,
    name: 'eventDate',
  });

  const { field: duration } = useController({
    control,
    name: 'duration',
  });

  const { field: recurringFrequency } = useController({
    control,
    name: 'recurringDetails.frequency',
  });

  const { field: recurringWeekDays } = useController({
    control,
    name: 'recurringDetails.weekDays',
  });

  const { field: recurringMonthDates } = useController({
    control,
    name: 'recurringDetails.monthDates',
  });

  const { field: recurringCustom } = useController({
    control,
    name: 'recurringDetails.custom',
  });

  const { field: recurringInterval } = useController({
    control,
    name: 'recurringDetails.interval',
  });

  const monthDates = useMemo(
    (): number[] => cleanList<number>(recurringMonthDates.value),
    [recurringMonthDates.value],
  );

  const weekDays = useMemo(
    () => cleanList<WeekDays>(recurringWeekDays.value) || [],
    [recurringWeekDays.value],
  );

  const { field: privacy } = useController({
    control,
    name: 'privacy',
  });

  const { field: cohosts } = useController({
    control,
    name: 'cohosts',
  });

  const { field: invitedMembers } = useController({
    control,
    name: 'invitations',
  });

  return {
    onSetFormCohosts: cohosts.onChange,
    onSetFormEventDate: eventDate.onChange,
    onSetFormInvitedMembers: invitedMembers.onChange,

    privacy: privacy.value,
    setPrivacy: privacy.onChange,

    duration: duration.value || DEFAULT_EVENT_DURATION,
    setDuration: duration.onChange,

    timezone: timezone.value,
    setTimezone: timezone.onChange,

    isCustomRepeat: !!recurringCustom.value,
    setIsCustomRepeat: recurringCustom.onChange,

    weekDays,
    setWeekDays: recurringWeekDays.onChange,

    interval: recurringInterval.value ?? 1,
    setEventInterval: recurringInterval.onChange,

    frequency: recurringFrequency.value as Frequency,
    setFrequency: recurringFrequency.onChange,

    monthDates,
    setMonthDates: recurringMonthDates.onChange,
  };
};
