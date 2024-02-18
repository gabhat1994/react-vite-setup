import { Header } from '@/components/Header';
import SkeletonLoaderProvider from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import ROUTES from '@/constants/routes';
import EVENTS from '@/constants/trackingEvents';
import { useAuth } from '@/features/auth/contexts';
import { NoumAuthorizationProvider } from '@/features/noums/contexts/NoumAuthorizationContext/NoumAuthorizationProvider';
import { useNoumDetails } from '@/features/noums/hooks/noums';
import { usePushNotification } from '@/features/push-notifications/contexts/PushNotification';
import { useLaunchDarkly } from '@/hooks';
import { AppLayout } from '@/layout/AppLayout';
import { GuestHeader } from '@/layout/GuestHeader';
import { MainHeader } from '@/layout/MainHeader';
import { type MessagePayload } from '@/services/rest/firebase';
import { SpaceUtils } from '@/utils/space';
import { trackEvent } from '@/utils/tracking';
import { UserUtil } from '@/utils/user';
import { useEffect, useRef, type FC } from 'react';
import { useNavigate } from 'react-router';
import styled, { css } from 'styled-components';
import { NoumUserConnectionProvider } from '@/features/noums/contexts/NoumUserConnectionContext';
import { ChamberProvider } from './ChamberProvider';
import { NoumAccessGateway } from './NoumAccessGateway';
import { type NoumViewProps } from './types';

const AppStyled = styled.div<{ applyMinHeight: boolean | undefined }>`
  font-family: var(--font-family);
  background: var(--bg-body-neutral-alt-highlighted) fixed;
  min-height: 100vh;
  ${({ applyMinHeight }) =>
    applyMinHeight &&
    css`
      overflow: auto;
      min-height: 100vh;
    `}
  overflow: unset;
`;

const NoumView: FC<NoumViewProps> = ({ id, children, isCustomPreview }) => {
  const { user } = useAuth();
  const { space, loading, loadingSpace, refetchSpaceById } = useNoumDetails(id);

  const navigate = useNavigate();

  const { isUnregistered } = useAuth();
  const {
    flags: { newAppNavigation },
  } = useLaunchDarkly();
  const { onForegroundMessage } = usePushNotification();

  const isRiseNoum = SpaceUtils.isRiseNoum(space);
  const isRiseApplicationNoum = SpaceUtils.isRiseApplicatonCategory(space);

  const stayedOnRiseNoum = useRef<number>(new Date().getTime());

  useEffect(
    () =>
      onForegroundMessage((message: MessagePayload) => {
        const chamberIdFromNotification = message.data?.chamberId;
        if (chamberIdFromNotification === id) {
          switch (message.data?.pnId) {
            case 'connectionInviteAccepted':
            case 'connectionInviteDeclined':
              refetchSpaceById();
              break;
          }
        }
      }),
    [id, onForegroundMessage, refetchSpaceById],
  );

  useEffect(() => {
    if (id && !loadingSpace && !space) {
      navigate(ROUTES.NOUMS);
    }
  }, [id, space, loadingSpace, navigate]);

  useEffect(() => {
    if (
      isUnregistered &&
      !loading &&
      !loadingSpace &&
      !space?.isConnected &&
      !space?.enableAds // Track enableAds flag to allow unregister user to see the noum if SEO is enabled
    ) {
      navigate(ROUTES.NOT_FOUND);
    }
  }, [isUnregistered, user?._id, navigate, loading, loadingSpace, space]);

  useEffect(() => {
    stayedOnRiseNoum.current = new Date().getTime();
    // Fire clever tap event if user visited Rise Noum
    return () => {
      if (isRiseNoum) {
        trackEvent(EVENTS.RISE.NOUM_VISITED, {
          UUID: user?._id,
          stay: new Date().getTime() - stayedOnRiseNoum.current,
          description: 'Time in ms that the user stayed on this page.',
        });
      }
    };
  }, [isRiseNoum, user]);

  const isLoading = (loading || loadingSpace) && !space;

  useEffect(() => {
    if (
      isRiseApplicationNoum &&
      window.location.href.indexOf('type=rise_application') === -1
    ) {
      window.history.replaceState(
        {},
        '',
        `${window.location.href}?type=rise_application`,
      );
    }
    if (isRiseNoum && window.location.href.indexOf('type=rise') === -1) {
      window.history.replaceState({}, '', `${window.location.href}?type=rise`);
    }
  }, [isRiseApplicationNoum, isRiseNoum]);

  if (newAppNavigation) {
    const mainContent = (
      <SkeletonLoaderProvider isLoading={isLoading}>
        <NoumAuthorizationProvider noumId={id}>
          <ChamberProvider noumId={id}>
            <NoumAccessGateway>
              <NoumUserConnectionProvider>
                {children}
              </NoumUserConnectionProvider>
            </NoumAccessGateway>
          </ChamberProvider>
        </NoumAuthorizationProvider>
      </SkeletonLoaderProvider>
    );

    if (isCustomPreview) {
      return mainContent;
    }

    return (
      <AppLayout.Layout
        onGoBack={
          isUnregistered
            ? () => navigate(ROUTES.GUEST_HOME)
            : () => navigate(-1)
        }
        topNavbar={
          !isCustomPreview && isUnregistered ? (
            <Header isBorderRadius={false}>
              <GuestHeader leftNavButton={true} />
            </Header>
          ) : (
            <AppLayout.TopBar />
          )
        }
        sideNav={<AppLayout.SideNavigation />}
      >
        {mainContent}
      </AppLayout.Layout>
    );
  }

  return (
    <AppStyled
      data-testid="CHAMBER"
      className="App"
      applyMinHeight={(space?.elements && space?.elements?.length < 3) || false}
    >
      <SkeletonLoaderProvider isLoading={isLoading}>
        {!isCustomPreview && (
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
        <NoumAuthorizationProvider noumId={id}>
          <ChamberProvider noumId={id}>
            <NoumAccessGateway>
              <NoumUserConnectionProvider>
                {children}
              </NoumUserConnectionProvider>
            </NoumAccessGateway>
          </ChamberProvider>
        </NoumAuthorizationProvider>
      </SkeletonLoaderProvider>
    </AppStyled>
  );
};

export default NoumView;
