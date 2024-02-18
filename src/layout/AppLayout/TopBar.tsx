import { AppTopBar } from '@/components/AppNavigation/AppTopBar';
import {
  GlobalSearch,
  type GlobalSearchProps,
} from '@/features/globalSearch/components/GlobalSearch';
import { breakpoints } from '@/constants/devices';
import { useAuth } from '@/features/auth/contexts';
import { useWindowDimensions } from '@/hooks/dimensions';
import { useMemo } from 'react';
import routes from '@/constants/routes';
import { AlertNotificationsList } from '@/features/alert-notifications/AlertNotificationsList';
import { useAppLayout } from './AppLayoutContext';
import { TopBarActivities } from './features/activities/Activities';
import {
  getUserNavItem,
  useMenuNavigationHandler,
  useSelectedNavItem,
} from './utils';
import * as S from './styles';

interface AppLayoutTopBarProps {
  searchTypeFilter?: GlobalSearchProps['type'];
  onSearchChange?: GlobalSearchProps['setResults'];
  onSearchClick?(): void;
  onLogoClick?(): void;
}

export function AppLayoutTopBar({
  searchTypeFilter,
  onSearchChange,
  onSearchClick,
  onLogoClick,
}: AppLayoutTopBarProps) {
  const { user } = useAuth();
  const { width } = useWindowDimensions();

  const { hasSideNav, onGoBack, toggleSideMenu, onNavigate } = useAppLayout();

  const userNavItem = useMemo(() => getUserNavItem(user), [user]);
  const selectedItem = useSelectedNavItem(userNavItem.subNavItems ?? []);

  const handleNavItemSelect = useMenuNavigationHandler();

  const shouldCollapseSearchInput = width < breakpoints.MOBILE_L;
  const shouldRenderDrawerMenu = width <= breakpoints.TABLET_L;

  const isBackButtonVisible = shouldRenderDrawerMenu;
  const isUserButtonVisible = !shouldRenderDrawerMenu;

  return (
    <AppTopBar.Container>
      <AlertNotificationsList />
      <AppTopBar.Group grow>
        {!!onGoBack && isBackButtonVisible && (
          <>
            <AppTopBar.IconButton
              name="arrow_left_m"
              label="Go Back"
              onClick={onGoBack}
            />
            <AppTopBar.Separator />
          </>
        )}
        {hasSideNav && shouldRenderDrawerMenu && (
          <>
            <AppTopBar.IconButton
              name="menu_m"
              label="Menu"
              onClick={() => {
                toggleSideMenu((s) => !s);
              }}
            />
            <AppTopBar.Separator />
          </>
        )}

        <AppTopBar.Logo
          onClick={onLogoClick ?? (() => onNavigate(routes.HOME))}
        />
        <AppTopBar.Separator />

        {shouldCollapseSearchInput ? (
          <AppTopBar.ActivityIcon
            name="search"
            label="Search"
            onClick={onSearchClick ?? (() => onNavigate(routes.SEARCH))}
          />
        ) : (
          <S.TopBarExpandedSearchWrapper>
            <GlobalSearch
              fullWidth
              setResults={onSearchChange}
              type={searchTypeFilter}
            />
          </S.TopBarExpandedSearchWrapper>
        )}
      </AppTopBar.Group>
      <AppTopBar.Group>
        <TopBarActivities />
        {isUserButtonVisible && (
          <>
            <AppTopBar.Separator $margin="0 12px" />
            <AppTopBar.UserNavButton
              item={userNavItem}
              selectedItemKey={selectedItem?.key ?? null}
              onNavItemClick={handleNavItemSelect}
            />
          </>
        )}
      </AppTopBar.Group>
    </AppTopBar.Container>
  );
}
