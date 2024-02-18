import { t } from 'i18next';
import ROUTES from '@/constants/routes';
import MyAccount from '@/layout/MyAccountLayout';
import { Route, Routes } from 'react-router';
import { useMemo } from 'react';
import { getAccountRelativeRouteName } from '@/layout/MyAccountLayout/sideMenuItems';
import AccountSettings from './AccountSettings';
import InvitesFriends from './InvitesFriends';
import NotificationsSettings from './NotificationsSettings';
import Cookie from './Cookie';

const CoreSettings = () => {
  const pathName = window.location.pathname;

  const mobileHeader = useMemo(() => {
    switch (pathName) {
      case ROUTES.ACCOUNT_SETTINGS:
        return t('noumena.myaccount.account_settings');
      case ROUTES.INVITES_FRIENDS:
        return t('noumena.side_menu.invite_a-friend');
      case ROUTES.NOTIFICATIONS_SETTINGS:
        return t('noumena.side_menu.notifications_settings');
      case ROUTES.COOKIE_SETTINGS:
        return t('noumena.cookie-policy-page.header');
      default:
        return '';
    }
  }, [pathName]);

  return (
    <MyAccount mobileHeader={mobileHeader}>
      <Routes>
        <Route
          path={getAccountRelativeRouteName(ROUTES.ACCOUNT_SETTINGS)}
          element={<AccountSettings />}
        />
        <Route
          path={getAccountRelativeRouteName(ROUTES.INVITES_FRIENDS)}
          element={<InvitesFriends />}
        />
        <Route
          path={getAccountRelativeRouteName(ROUTES.NOTIFICATIONS_SETTINGS)}
          element={<NotificationsSettings />}
        />
        <Route
          path={getAccountRelativeRouteName(ROUTES.COOKIE_SETTINGS)}
          element={<Cookie />}
        />
      </Routes>
    </MyAccount>
  );
};

export default CoreSettings;
