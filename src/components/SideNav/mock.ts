import { type SideNavItemProps } from './SideNavItem/types';

export const defaultNavItems: SideNavItemProps[] = [
  {
    icon: 'home_m',
    label: 'Home',
    id: '1',
    value: 'home',
    to: '#',
  },
  {
    icon: 'search_m',
    label: 'Discovery',
    id: '2',
    value: 'discovery',
    to: '#',
  },
  {
    icon: 'wallet_m',
    label: 'Money',
    id: '3',
    value: 'money',
    to: '#',
  },
  {
    icon: 'social_hall_m',
    label: 'Noumns',
    id: '4',
    value: 'noumns',
    to: '#',
  },
];

export const disabledNavItems: SideNavItemProps[] = [
  {
    icon: 'home_m',
    label: 'Home',
    id: '1',
    value: 'home',
    to: '#',
    disabled: true,
  },
  {
    icon: 'search_m',
    label: 'Discovery',
    id: '2',
    value: 'discovery',
    to: '#',
  },
  {
    icon: 'wallet_m',
    label: 'Money',
    id: '3',
    value: 'money',
    to: '#',
  },
  {
    icon: 'social_hall_m',
    label: 'Noumns',
    id: '4',
    value: 'noumns',
    to: '#',
  },
];
