import { t } from 'i18next';
import { type DropdownValueType } from '@/components/Dropdown';
import { LINKS } from '@/constants/links';
import { GuestMenuValues } from './types';

export const GuestMenuOptions: DropdownValueType<string>[] = [
  {
    key: 'edit-data',
    value: GuestMenuValues.EDIT_DATA,
    type: 'value',
    label: t('noumena.guest.header.menu.edit_data'),
    labelColor: '--text-tablecell-header-neutral-highlighted',
  },
  {
    key: 'log-out',
    value: GuestMenuValues.LOGOUT,
    type: 'value',
    label: t('noumena.guest.header.menu.log_out'),
    labelColor: '--text-tablecell-header-danger-primary-highlighted',
    intent: 'danger',
  },
];

export const ExternalLinks: DropdownValueType<string>[] = [
  {
    key: 'about_noumena',
    value: LINKS.ABOUT_US,
    type: 'value',
    label: t('noumena.guest.header.links.menu.about_noumena'),
  },
  {
    key: 'privacy-policy',
    value: LINKS.PRIVACY,
    type: 'value',
    label: t('noumena.guest.header.links.menu.privacy_policy'),
  },
  {
    key: 'terms-of-use',
    value: LINKS.TERMS_OF_USE,
    type: 'value',
    label: t('noumena.guest.header.links.menu.terms_of_use'),
  },
];
