import type { Frequency, Timezone } from '@/apollo/generated/types';

import { type DropdownValueType } from '@/components/Dropdown';
import { type ITextField } from '@/components/TextField/types';
import type {
  TSetCustomErrorFunc,
  IEventTimeDropdown,
  IEventTimezoneDropdown,
} from '../../../types/context';

export interface EventRepeatPickerProps
  extends Omit<ITextField, 'defaultValue'> {
  defaultValue?: string | null;
  isNoumEditor?: boolean;
  onOpenCustomModal: () => void;
  availableOccurrences: DropdownValueType<Frequency | string>[];
  frequency: Frequency | string;
  onFrequencyChanged: (value: DropdownValueType<Frequency | string>) => void;
}

export interface EventTimePickerProps {
  date: Date;
  time: string;
  availableTimes: IEventTimeDropdown[];
  error: boolean;
  setCustomError?: TSetCustomErrorFunc;
  onChange: (d?: Date) => void;
}

export interface TimezonePickerProps {
  timezone: Timezone | undefined;
  availableTimezones: IEventTimezoneDropdown[];
  searchText: string;
  label?: string;
  loading: boolean;
  onChangeTimezone: (tz: Timezone) => void;
  onChangeSearch: (value: string) => void;
  onFetchMore: () => void;
}
