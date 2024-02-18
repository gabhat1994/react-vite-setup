import { t } from 'i18next';

import { EventsFilter } from '@/apollo/generated/types';
import { type InputListTypes } from '@/components/Tabs/types';
import { type DropdownValueType } from '@/components/Dropdown';

export const eventFilters: InputListTypes[] = [
  {
    id: 'all',
    name: 'all',
    image: 'filters_m',
    text: t('noumena.homeChambers.event.filter_all'),
    labelSize: 'auto',
  },
  {
    id: EventsFilter.Attending,
    name: EventsFilter.Attending,
    image: 'filters_m',
    text: t('noumena.homeChambers.event.filter_attending'),
    labelSize: 'auto',
  },
  {
    id: EventsFilter.Hosting,
    name: EventsFilter.Hosting,
    image: 'filters_m',
    text: t('noumena.homeChambers.event.filter_hosting'),
    labelSize: 'auto',
  },
  {
    id: EventsFilter.Invitation,
    name: EventsFilter.Invitation,
    image: 'filters_m',
    text: t('noumena.homeChambers.event.filter_invites'),
    labelSize: 'auto',
  },
  {
    id: EventsFilter.Expired,
    name: EventsFilter.Expired,
    image: 'filters_m',
    text: t('noumena.homeChambers.event.filter_past'),
    labelSize: 'auto',
  },
];

export const eventFiltersDropDown: DropdownValueType<string>[] = [
  {
    key: 'all',
    value: 'all',
    type: 'value',
    label: t('noumena.homeChambers.event.filter_all'),
  },
  {
    key: EventsFilter.Attending,
    value: EventsFilter.Attending,
    type: 'value',
    label: t('noumena.homeChambers.event.filter_attending'),
  },
  {
    key: EventsFilter.Hosting,
    value: EventsFilter.Hosting,
    type: 'value',
    label: t('noumena.homeChambers.event.filter_hosting'),
  },
  {
    key: EventsFilter.Invitation,
    value: EventsFilter.Invitation,
    type: 'value',
    label: t('noumena.homeChambers.event.filter_invites'),
  },
  {
    key: EventsFilter.Expired,
    value: EventsFilter.Expired,
    type: 'value',
    label: t('noumena.homeChambers.event.filter_past'),
  },
];
