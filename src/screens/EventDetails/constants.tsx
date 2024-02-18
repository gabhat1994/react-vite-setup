import { t } from 'i18next';
import { type DropdownValueType } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';

export const attendeesOptions: DropdownValueType<string>[] = [
  {
    key: t('noumena.editor.remove_from_event'),
    value: t('noumena.editor.remove_from_event'),
    type: 'value',
    label: t('noumena.editor.remove_from_event'),
    icon: (
      <Icon
        name="close_m"
        size={24}
        color="--text-tablecell-danger-primary-default"
      />
    ),
    intent: 'danger',
  },
];

export const EventDetialsEnum = {
  Details: 'Details',
  Attendees: 'Attendees',
};
