import React from 'react';
import { Header } from '@/components/Header';
import { MainHeader } from '@/layout/MainHeader';
import { useAuth } from '@/features/auth/contexts';
import { UserUtil } from '@/utils/user';
import { ChamberLeftSideBar } from '@/screens/Chamber/ViewChamber/ChamberLeftSideBar';
import { GuestHeader } from '@/layout/GuestHeader';
import { generatePath } from 'react-router';
import { NoumLeftSideBar } from '@/screens/Chamber/ViewChamber/NoumLeftSideBar';
import { useLaunchDarkly } from '@/hooks';
import routes from '@/constants/routes';
import { useNavigateBack } from '@/hooks/navigation';
import S from './styles';
import { type SinglePageLayoutProps } from './types';
import { AppLayout } from '../AppLayout';

const SinglePageLayout: React.FC<SinglePageLayoutProps> = ({
  children,
  showBackButton = false,
  responsiveMain = false,
  loading,
  goBackUrl,
}) => {
  const navigateBack = useNavigateBack();
  const { user, isUnregistered, isUnauthenticated } = useAuth();
  const { flags } = useLaunchDarkly();

  const handleGoBack = () => {
    const fallbackUrl =
      goBackUrl || isUnregistered ? generatePath(routes.GUEST_HOME) : undefined;
    navigateBack(-1, {
      fallback: fallbackUrl,
    });
  };

  if (flags.newAppNavigation) {
    return (
      <AppLayout.Layout
        onGoBack={handleGoBack}
        topNavbar={
          isUnauthenticated ? null : isUnregistered ? (
            <Header isBorderRadius={false}>
              <GuestHeader leftNavButton={true} />
            </Header>
          ) : (
            <AppLayout.TopBar />
          )
        }
        sideNav={isUnauthenticated ? null : <AppLayout.SideNavigation />}
      >
        {responsiveMain ? (
          <AppLayout.MainContent>{children}</AppLayout.MainContent>
        ) : (
          children
        )}
      </AppLayout.Layout>
    );
  }

  return (
    <S.Container data-testid="single-page-layout-container">
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
      {showBackButton ? (
        <S.Main data-testid="single-page-layout-main">
          {goBackUrl ? (
            <NoumLeftSideBar loading={loading} />
          ) : (
            <ChamberLeftSideBar />
          )}
          {children}
        </S.Main>
      ) : (
        children
      )}
    </S.Container>
  );
};

export const { ResponsiveMain, FullHeightMain } = S;

export default SinglePageLayout;
