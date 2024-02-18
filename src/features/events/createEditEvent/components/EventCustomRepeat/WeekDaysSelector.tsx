import { t } from 'i18next';
import { WeekDay } from '@/utils/recurringEventOccurance';
import type { WeekDays } from '@/apollo/generated/types';

import {
  ModalItem,
  ModalItemTitle,
  WeekDayButton,
} from '../EventDateTimeFields/styles';
import type { CustomEventPickerProps } from './types';

export const WeekDaysSelector = ({
  value,
  onChange,
}: CustomEventPickerProps<WeekDays[], WeekDays>) => (
  <ModalItem>
    <ModalItemTitle>{t(`noumena.event.custom_repeat`)}</ModalItemTitle>
    <ModalItemTitle>
      {WeekDay.map(({ initial, day }) => (
        <WeekDayButton
          key={day}
          size="small"
          value={day}
          primary={value?.includes(day)}
          secondary={!value?.includes(day)}
          onClick={() => onChange(day)}
        >
          {initial}
        </WeekDayButton>
      ))}
    </ModalItemTitle>
  </ModalItem>
);
