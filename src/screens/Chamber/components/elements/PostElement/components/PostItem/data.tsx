import { t } from 'i18next';
import { type DropdownValueType } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';

const Report: DropdownValueType<string> = {
  key: 'report-post',
  label: t('noumena.report'),
  type: 'value',
  value: 'Report',
  description: '',
  fontFamily: 'var(--font-body-medium-bold-font)',
  labelColor: '--text-tablecell-header-neutral-highlighted',
  icon: (
    <Icon
      name="report_m"
      size={24}
      color="--icon-tablecell-neutral-highlighted"
    />
  ),
};

const Edit: DropdownValueType<string> = {
  key: 'edit-post',
  label: t('noumena.chamber.edit_button'),
  type: 'value',
  value: 'Edit',
  description: '',
  fontFamily: 'var(--font-body-medium-bold-font)',
  labelColor: '--text-tablecell-header-neutral-highlighted',
  icon: (
    <Icon
      name="edit_m"
      size={24}
      color="--icon-tablecell-neutral-highlighted"
    />
  ),
};

const Delete: DropdownValueType<string> = {
  key: 'delete-post',
  label: t('noumena.delete'),
  type: 'value',
  value: 'Delete',
  description: '',
  fontFamily: 'var(--font-body-medium-bold-font)',
  labelColor: '--text-tablecell-header-danger-primary-highlighted',
  icon: (
    <Icon
      name="delete_m"
      size={24}
      color="--icon-tablecell-danger-primary-default"
    />
  ),
};

export const pinningOptions: DropdownValueType<string>[] = [
  {
    key: 'pin-post',
    label: t('noumena.pin'),
    type: 'value',
    value: 'Pin',
    description: '',
    fontFamily: 'var(--font-body-medium-bold-font)',
    labelColor: '--text-tablecell-header-neutral-highlighted',
    icon: (
      <Icon
        name="pin_m"
        size={24}
        color="--icon-tablecell-neutral-highlighted"
      />
    ),
  },
  {
    key: 'unpin-post',
    label: t('noumena.unpin'),
    type: 'value',
    value: 'Unpin',
    description: '',
    fontFamily: 'var(--font-body-medium-bold-font)',
    labelColor: '--text-tablecell-header-neutral-highlighted',
    icon: (
      <Icon
        name="unpin_m"
        size={24}
        color="--icon-tablecell-neutral-highlighted"
      />
    ),
  },
];

export const defaultPostActionOptions: DropdownValueType<string>[] = [
  Edit,
  Report,
  Delete,
];
