import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import type { Frequency } from '@/apollo/generated/types';
import type { DropdownValueType } from '@/components/Dropdown';

import { EventPicker } from '../EventPicker';
import type { CustomEventPickerProps } from './types';
import { customOccurrences } from '../../constants';
import { ModalItem, ModalItemTitle } from '../EventDateTimeFields/styles';

export const FrequencyPicker = ({
  value,
  onChange,
}: CustomEventPickerProps<string, DropdownValueType<Frequency | string>>) => (
  <ModalItem>
    <ModalItemTitle>
      <TSpan>{t(`noumena.event.custom_event_frequency`)}</TSpan>
    </ModalItemTitle>
    <ModalItemTitle>
      <EventPicker
        value={value}
        selectedLabel={value}
        options={customOccurrences || []}
        onOptionChange={onChange}
      />
    </ModalItemTitle>
  </ModalItem>
);
