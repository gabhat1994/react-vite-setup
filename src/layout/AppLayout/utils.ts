import { type Maybe, type UserOutput } from '@/apollo/generated/types';
import routes from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { useHelpPanel } from '@/hooks/helpPanel';
import { findMatchingItemRecursively } from '@/utils/list';
import { UserUtil } from '@/utils/user';
import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router';
import {
  type NavItemOption,
  type NavUserItemOption,
} from '@/components/AppNavigation/types';
import { type UserFragment } from '@/apollo/graphql/fragments';
import { useAppLayout } from './AppLayoutContext';

export const createNavItem: NavItemOption = {
  key: 'create',
  label: 'Create',
  subNavItems: [
    {
      key: 'create-noum',
      label: 'Noum',
      iconName: 'noum',
    },
    {
      key: 'start-personal-event',
      label: 'Start Personal Event',
      iconName: 'event',
    },
    {
      key: 'create-event-instant',
      label: 'Start Event Now',
      iconName: 'event',
    },
    {
      key: 'create-event-scheduled',
      label: 'Schedule New Event',
      iconName: 'event',
    },
    {
      key: 'create-contract',
      label: 'Contract',
      iconName: 'contracts',
      route: routes.CONTRACT_CREATE,
    },
    {
      key: 'create-statement-of-work',
      label: 'SOW',
      iconName: 'contracts',
      route: routes.STATEMENT_OF_WORK_CREATE,
    },
    {
      key: 'create-invoice',
      label: 'Invoice',
      iconName: 'invoices',
      route: routes.INVOICE_CREATE,
    },
  ],
};
export const mainNavItems: NavItemOption[] = [
  {
    key: 'home',
    label: 'Home',
    iconName: 'home',
    route: routes.HOME,
  },
  {
    key: 'money',
    label: 'Money',
    iconName: 'money',
    route: routes.MONEY,
  },
  {
    key: 'discover',
    label: 'Discover',
    iconName: 'discover',
    route: routes.DISCOVERY,
  },
  {
    key: 'community',
    label: 'Community',
    iconName: 'community',
    route: routes.COMMUNITY,
  },
  {
    key: 'noums',
    label: 'Noums',
    iconName: 'noums',
    route: routes.NOUMS,
  },
];
export const toolsNavItems: NavItemOption[] = [
  {
    key: 'tools-contracts',
    label: 'Contracts',
    iconName: 'contracts',
    route: routes.CONTRACT_MANAGER,
  },
  {
    key: 'tools-invoices',
    label: 'Invoices',
    iconName: 'invoices',
    route: routes.INVOICE_MANAGER,
  },
  {
    key: 'tools-contacts',
    label: 'Contacts',
    iconName: 'contacts',
    route: routes.CONTACT_MANAGER,
  },
  {
    key: 'tools-campaigns',
    label: 'Campaigns',
    iconName: 'campaign',
    route: routes.CAMPAIGNS,
  },
];

export function getUserNavItem(
  user: Maybe<UserFragment | UserOutput> | undefined,
): NavUserItemOption {
  return {
    key: 'user',
    label: UserUtil.renderName(user),
    avatarUrl: UserUtil.getProfilePicture(user),
    subNavItems: [
      {
        key: 'user-my-profile',
        label: 'My Profile',
        iconName: 'my_profile',
        route: routes.HOME_NOUM,
      },
      {
        key: 'user-settings',
        label: 'Settings',
        iconName: 'settings',
        route: routes.ACCOUNT_SETTINGS,
      },
      {
        key: 'user-help',
        label: 'Help',
        iconName: 'help',
      },
      {
        key: 'user-logout',
        label: 'Log Out',
        iconName: 'log_out',
      },
    ],
  };
}

export function useSelectedNavItem(options: NavItemOption[]) {
  const { pathname } = useLocation();

  const selectedNavItem = useMemo(
    () =>
      findMatchingItemRecursively(
        options,
        (item) => !!item.route && !!matchPath(item.route, pathname),
        (item) => item.subNavItems,
      ),
    [pathname, options],
  );

  return selectedNavItem;
}

interface UseMenuNavigationHandlerOptions {
  onItemClick?(item: NavItemOption): void;
}

export function useMenuNavigationHandler({
  onItemClick,
}: UseMenuNavigationHandlerOptions = {}) {
  const { onNavigate } = useAppLayout();

  const { signOut } = useAuth();
  const { toggleHelpPanel } = useHelpPanel();

  const handleItemSelect = (item: NavItemOption) => {
    if (item.route) {
      onNavigate(item.route);
      return;
    }

    switch (item.key) {
      case 'user-help':
        toggleHelpPanel();
        return;
      case 'user-logout': {
        signOut();
        return;
      }
      default:
        onItemClick?.(item);
    }
  };

  return handleItemSelect;
}
