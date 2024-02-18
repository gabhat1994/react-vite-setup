import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { MainHeader } from '@/layout/MainHeader';
import { UserUtil } from '@/utils/user';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import { SideMenu } from '@/components/SideMenu';
import { HamburgerWrapper, MobileHeader } from '@/components/SideMenu/styles';
import { Icon } from '@/components/Icon';
import { breakpoints } from '@/constants/devices';
import { TSpan } from '@/components/Typography';
import { Modal } from '@/components/ExtendedModal';
import { sideMenuItems, sideMenuItemsMore } from './sideMenuItems';
import {
  Container,
  Main,
  LeftContent,
  Content,
  ContentV2,
  LayoutMainContent,
} from './styles';
import { type LayoutProps } from './types';
import { AppLayout } from '../AppLayout';

const MyAccount: React.FC<LayoutProps> = ({ children, mobileHeader }) => {
  const { width } = useWindowDimensions();
  const isLaptop = width > breakpoints.TABLET_L;

  const [isShown, setIsShown] = useState(!isLaptop);

  const { user, isPending } = useAuth();
  const navigate: NavigateFunction = useNavigate();
  const onNavigate = useCallback(
    (nextPath: string, externalLink: boolean) => {
      setIsShown(false);
      if (externalLink) {
        window.open(nextPath, '_blank');
        return;
      }

      navigate(nextPath, { replace: false });
    },
    [navigate],
  );

  const { flags } = useLaunchDarkly();

  const handleClick = () => {
    setIsShown(!isShown);
  };
  useEffect(() => {
    setIsShown(isLaptop);
  }, [width, isLaptop]);

  const sideMenuBar = () => (
    <SideMenu
      data-testid="layout-left-content"
      onNavChange={onNavigate}
      navItems={sideMenuItems}
      navItemsMore={sideMenuItemsMore}
      handleClose={() => setIsShown(false)}
      isUserPending={isPending}
    />
  );

  const ContentWrapper = flags.newSignUp ? ContentV2 : Content;

  if (flags.newAppNavigation) {
    return (
      <AppLayout.Layout
        onGoBack={() => navigate(-1)}
        background="neutral-alt"
        topNavbar={<AppLayout.TopBar />}
        sideNav={<AppLayout.SideNavigation />}
      >
        <Main data-testid="layout-main" $isAppUiV2>
          <LeftContent data-testid="layout-left-content">
            {isLaptop ? (
              sideMenuBar()
            ) : (
              <Modal open={isShown} forceHideCloseButton isFullScreen>
                {' '}
                {sideMenuBar()}{' '}
              </Modal>
            )}
          </LeftContent>
          <LayoutMainContent data-testid="layout-main-content">
            {!isLaptop && (
              <MobileHeader>
                <HamburgerWrapper>
                  <Icon
                    name="menu_m"
                    size={24}
                    onClick={handleClick}
                    color="--icon-button-neutral-default"
                  />
                </HamburgerWrapper>
                <TSpan
                  font="body-l-bold"
                  colorToken="--text-appbar-neutral-default"
                >
                  {mobileHeader}
                </TSpan>
              </MobileHeader>
            )}
            <ContentWrapper>{children}</ContentWrapper>
          </LayoutMainContent>
        </Main>
      </AppLayout.Layout>
    );
  }

  return (
    <Container data-testid="layout-container">
      <Header isBorderRadius={false}>
        <MainHeader
          avatar={UserUtil.getProfilePicture(user) || undefined}
          userName={user?.firstName || undefined}
        />
      </Header>
      <Main data-testid="layout-main">
        <LeftContent data-testid="layout-left-content">
          {isLaptop ? (
            sideMenuBar()
          ) : (
            <Modal open={isShown} forceHideCloseButton isFullScreen>
              {' '}
              {sideMenuBar()}{' '}
            </Modal>
          )}
        </LeftContent>
        <LayoutMainContent data-testid="layout-main-content">
          {!isLaptop && (
            <MobileHeader>
              <HamburgerWrapper>
                <Icon
                  name="menu_m"
                  size={24}
                  onClick={handleClick}
                  color="--icon-button-neutral-default"
                />
              </HamburgerWrapper>
              <TSpan
                font="body-l-bold"
                colorToken="--text-appbar-neutral-default"
              >
                {mobileHeader}
              </TSpan>
            </MobileHeader>
          )}
          <Content>{children}</Content>
        </LayoutMainContent>
      </Main>
    </Container>
  );
};
export default MyAccount;
