import ROUTES from '@/constants/routes';
import { type SideNavItemProps } from '@/components/SideNav/SideNavItem/types';

const sideNavItems: SideNavItemProps[] = [
  {
    icon: 'home_m',
    label: 'Home',
    id: '1',
    value: ROUTES.HOME,
    to: ROUTES.HOME,
    disabled: false,
  },
  {
    icon: 'groups_m',
    label: 'Community',
    id: '2',
    value: ROUTES.COMMUNITY,
    to: ROUTES.COMMUNITY,
  },
  {
    icon: 'search_m',
    label: 'Discovery',
    id: '3',
    value: ROUTES.DISCOVERY,
    to: ROUTES.DISCOVERY,
  },
  {
    icon: 'wallet_m',
    label: 'Money',
    id: '4',
    value: ROUTES.MONEY,
    to: ROUTES.MONEY,
  },
  {
    icon: 'social_hall_m',
    label: 'Noums',
    id: '5',
    value: ROUTES.NOUMS,
    to: ROUTES.NOUMS,
  },
];

export const NoumSideNavItems: SideNavItemProps[] = [
  {
    icon: 'arrow_left_m',
    label: 'Back',
    id: '1',
    value: 'back',
    to: '#',
    disabled: false,
  },
];

export const SinglePostSideNavBar: SideNavItemProps[] = [
  {
    icon: 'arrow_left_m',
    label: 'Post Details',
    id: '1',
    value: 'back',
    to: '#',
    disabled: false,
  },
];

export const GuestNoumSideNavItems: SideNavItemProps[] = [
  {
    icon: 'arrow_left_m',
    label: 'Back',
    id: '1',
    value: ROUTES.GUEST_HOME,
    to: ROUTES.GUEST_HOME,
    disabled: false,
  },
];

export default sideNavItems;
