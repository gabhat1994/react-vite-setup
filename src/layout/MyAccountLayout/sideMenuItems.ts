import { t } from 'i18next';
import ROUTES from '@/constants/routes';
import { type SideMenuItemProps } from '@/components/SideMenu/SideMenuItem/types';

export const getAccountRelativeRouteName = (route: string) =>
  route.replace(ROUTES.MY_ACCOUNT, '');

export const sideMenuItems: SideMenuItemProps[] = [
  {
    icon: 'settings_m',
    label: t(`noumena.myaccount.account_settings`),
    id: '2',
    value: `${ROUTES.ACCOUNT_SETTINGS}`,
    to: `${ROUTES.ACCOUNT_SETTINGS}`,
  },
  {
    icon: 'notifications_m',
    label: t(`noumena.myaccount.notifications`),
    id: '3',
    value: `${ROUTES.NOTIFICATIONS_SETTINGS}`,
    to: `${ROUTES.NOTIFICATIONS_SETTINGS}`,
  },
];
export const sideMenuItemsMore: SideMenuItemProps[] = [
  {
    icon: 'terms_m',
    label: 'Cookie Policy',
    id: '4',
    value: `${ROUTES.COOKIE_SETTINGS}`,
    to: `${ROUTES.COOKIE_SETTINGS}`,
  },
];
