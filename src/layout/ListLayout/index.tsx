import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  useLocation,
  useNavigate,
  type Location,
  type NavigateFunction,
} from 'react-router-dom';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { GuestHeader } from '@/layout/GuestHeader';
import { MainHeader } from '@/layout/MainHeader';
import { SideNav } from '@/components/SideNav';
import { StickyContainer } from '@/components/StickyContainer';
import { TSpan } from '@/components/Typography';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { breakpoints } from '@/constants/devices';
import sideNavItems from '@/constants/sideNavItems';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import * as Storyblok from '@/services/rest/storyblok';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { UserUtil } from '@/utils/user';
import { AppLayout } from '../AppLayout';
import { Stack, StackItem } from '../Stack';
import {
  Container,
  Content,
  LeftContent,
  Main,
  RightContent,
  StyledBanner,
} from './styles';
import { type BannerContent, type LayoutProps, type RootObject } from './types';

const ListLayout: React.FC<LayoutProps> = ({
  type,
  rightContent,
  children,
  onGoBack,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const { user, isUnregistered, isUnauthenticated } = useAuth();
  const { flags } = useLaunchDarkly();

  const [activePath, setActivePath] = useState<string>('');
  const [showBanner, setShowBanner] = useState<boolean>(true);

  const [bannerContent, setBannerContent] = useState<BannerContent>();
  const componentMounted = useRef(true);

  useEffect(() => {
    const showBannerFromLocalStorage =
      getLocalStorage(accessLocalStorage.SHOW_BANNER) === null;
    setShowBanner(showBannerFromLocalStorage);
  }, [showBanner]);

  useEffect(() => {
    async function getBannerContent() {
      const { data }: { data: RootObject } = await Storyblok.getBannerContent();
      if (componentMounted.current) {
        const description = data?.story?.content?.Description;
        const buttonText = data?.story?.content?.ButtonText;
        const buttonLink = data?.story?.content?.ButtonLink;
        setBannerContent({ description, buttonText, buttonLink });
      }
    }

    getBannerContent();
  }, []);

  useLayoutEffect(() => {
    let path = '/';
    sideNavItems.some((navItem) => {
      if (
        navItem.value.length > 1 &&
        location.pathname.includes(navItem.value)
      ) {
        path = navItem.value;
        return true;
      }
      return false;
    });

    setActivePath(path);
  }, [location.pathname]);

  const onNavigate = useCallback(
    (nextPath: string) => {
      setActivePath(nextPath);
      navigate(nextPath, { replace: false });
    },
    [navigate],
  );

  const windowDimensions = useWindowDimensions();
  const isUptoTablet = windowDimensions.width < breakpoints.LAPTOP;

  if (flags.newAppNavigation) {
    return (
      <AppLayout.Layout
        onGoBack={onGoBack}
        topNavbar={
          isUnauthenticated ? null : isUnregistered ? (
            <Header isBorderRadius={false}>
              <GuestHeader leftNavButton={true} />
            </Header>
          ) : (
            <AppLayout.TopBar />
          )
        }
        sideNav={<AppLayout.SideNavigation />}
      >
        <AppLayout.MainContent>
          <Stack vertical align="stretch" gap={24} fullWidth>
            {showBanner && bannerContent?.buttonText && (
              <StyledBanner>
                <TSpan
                  font="body-m"
                  colorToken="--text-campaign-banner-success-primary-default"
                >
                  {bannerContent?.description}
                </TSpan>
                <div className="action-buttons">
                  <Button
                    primary
                    intent="positive"
                    onClick={() =>
                      onNavigate(
                        `/article?slug=articles/${bannerContent?.buttonLink}`,
                      )
                    }
                  >
                    {bannerContent?.buttonText}
                  </Button>
                  <TSpan
                    font="button-m"
                    colorToken="--text-button-success-secondary-default"
                    onClick={() => {
                      setShowBanner(false);
                      setLocalStorage(accessLocalStorage.SHOW_BANNER, false);
                    }}
                  >
                    Dismiss
                  </TSpan>
                </div>
              </StyledBanner>
            )}

            <Stack gap={24} align="start" justify="stretch" fullWidth>
              <StackItem grow>{children}</StackItem>

              {!!rightContent && (
                <RightContent data-testid="layout-right-content">
                  <StickyContainer>{rightContent}</StickyContainer>
                </RightContent>
              )}
            </Stack>
          </Stack>
        </AppLayout.MainContent>
      </AppLayout.Layout>
    );
  }

  return (
    <Container data-testid="layout-container">
      {isUnauthenticated ? null : (
        <Header isBorderRadius={false}>
          {isUnregistered ? (
            <GuestHeader leftNavButton={true} />
          ) : (
            <MainHeader
              avatar={UserUtil.getProfilePicture(user) || undefined}
              userName={user?.firstName || undefined}
            />
          )}
        </Header>
      )}
      {showBanner && bannerContent?.buttonText && (
        <StyledBanner>
          <TSpan
            font="body-m"
            colorToken="--text-campaign-banner-success-primary-default"
          >
            {bannerContent?.description}
          </TSpan>
          <div className="action-buttons">
            <Button
              primary
              intent="positive"
              onClick={() =>
                onNavigate(
                  `/article?slug=articles/${bannerContent?.buttonLink}`,
                )
              }
            >
              {bannerContent?.buttonText}
            </Button>
            <TSpan
              font="button-m"
              colorToken="--text-button-success-secondary-default"
              onClick={() => {
                setShowBanner(false);
                setLocalStorage(accessLocalStorage.SHOW_BANNER, false);
              }}
            >
              Dismiss
            </TSpan>
          </div>
        </StyledBanner>
      )}
      <Main
        data-testid="layout-main"
        type={type}
        style={{
          display: type === 'Community' && isUptoTablet ? 'block' : 'flex',
        }}
      >
        <LeftContent data-testid="layout-left-content" type={type}>
          <StickyContainer leftNav>
            <SideNav
              onNavChange={onNavigate}
              navItems={sideNavItems}
              activeNavValue={activePath}
            />
          </StickyContainer>
        </LeftContent>
        <Content data-testid="layout-main-content" type={type}>
          {children}
        </Content>
        {!!rightContent && (
          <RightContent data-testid="layout-right-content">
            <StickyContainer>{rightContent}</StickyContainer>
          </RightContent>
        )}
      </Main>
    </Container>
  );
};

export default ListLayout;
