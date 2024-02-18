import { type DropdownValueType } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { t } from 'i18next';

export const options: DropdownValueType<string>[] = [
  {
    key: t('noumena.editor.event.edit.modal.title'),
    label: t('noumena.editor.event.edit.modal.title'),
    type: 'value',
    value: t('noumena.editor.event.edit.modal.title'),
    icon: <Icon name="edit_m" size={24} />,
  },
  {
    key: t('noumena.social_hall.copy_link'),
    label: t('noumena.social_hall.copy_link'),
    type: 'value',
    value: t('noumena.social_hall.copy_link'),
    icon: <Icon name="link_m" size={24} />,
  },
];
