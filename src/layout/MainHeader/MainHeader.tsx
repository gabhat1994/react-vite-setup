import { t } from 'i18next';
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type Ref,
} from 'react';
import { useLocation, useNavigate } from 'react-router';

import {
  useEventsSubscription,
  type EventFragment,
  type NotificationFragment,
} from '@/apollo/graphql';
import { Privacy, type Event, type Maybe } from '@/apollo/generated/types';
import { useGetInvitedEventsCountQuery } from '@/apollo/graphql/queries';
import OwnerDefaultImage from '@/assets/images/profile_default.png';
import { Avatar } from '@/components/Avatar/Avatar';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import Logo from '@/components/Logo';
import { breakpoints } from '@/constants/devices';
import ROUTES from '@/constants/routes';
import { AlertNotificationsList } from '@/features/alert-notifications/AlertNotificationsList';
import { ConversationUnreadStatusContext } from '@/features/conversation/contexts/ConversationUnreadStatusContext';
import { useAuth } from '@/features/auth/contexts';
import { useWindowDimensions } from '@/hooks';
import { useAppBadge } from '@/hooks/appBadge';
import { useHelpPanel } from '@/hooks/helpPanel';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { Spacer, Stack } from '@/layout';
import { useSocialHallCallContext } from '@/providers';
import NotificationsSidebar from '@/screens/Notifications';
import { useUnreadNotificationsCount } from '@/screens/Notifications/hooks/notificationsList';
import setHelperPosition, {
  defaultStyles,
  resetHelpStyles,
  setCSSStyles,
} from '@/features/help/utils';
import {
  Dropdown,
  DropdownPicker,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { isFireFox } from '@/utils/browserDetect';
import { useIsSocialHallUrl } from '@/hooks/useIsSocialHallUrl';
import { useSocialHallEvent } from '@/features/socialHall/hooks';
import { EventListModal } from '@/features/events/components';
import { TokenNotification } from '@/components/TokenNotification';
import { CreateEditEvent } from '@/features/events/createEditEvent';
import { GlobalSearch } from '@/features/globalSearch/components/GlobalSearch';
import { EventDetailModal } from '@/features/events/components/EventDetailModal';

import {
  BadgeContainer,
  IconContainer,
  Logout,
  LogoutContainer,
  LogoutIcon,
  MainHeaderLabel,
  MainHeaderWrapper,
  NotificationBadge,
  NotificationWrapper,
  NotificationsIcon,
  SearchWrapper,
} from './styles';
import {
  type MainHeaderContainerProps,
  type MainHeaderEventModalOpenStatus,
  type MainHeaderProps,
  type MainHeaderSideModalOpenStatus,
} from './types';

const MenuOptions: DropdownValueType<string>[] = [
  {
    key: 'homenoum',
    value: ROUTES.HOME_NOUM,
    type: 'value',
    label: t('noumena.header.menu.home_noum'),
  },
  {
    key: 'account-settings',
    value: ROUTES.ACCOUNT_SETTINGS,
    type: 'value',
    label: t('noumena.header.menu.account_settings'),
  },
  {
    key: 'help',
    value: 'HELP',
    type: 'value',
    label: t('noumena.header.menu.help'),
  },
  {
    key: 'log-out',
    value: 'LOGOUT',
    type: 'value',
    label: t('noumena.header.logout_button.text'),
    labelColor: '--text-tablecell-header-danger-primary-highlighted',
    intent: 'danger',
  },
];

type ModalType = 'create-edit-event';

type ModalContext = {
  event?: EventFragment;
  callback?: () => void;
};

export const MainHeaderInner = forwardRef(
  (
    {
      coins = 0,
      calendars = 0,
      notifications = 0,
      messages = 0,
      avatar = OwnerDefaultImage,
      userName = '',
      searchFilter,
      setSearchResult,
      onMenuButtonClick,
    }: MainHeaderProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { onExitSocialHallCall } = useSocialHallCallContext();
    const { flags } = useLaunchDarkly();
    const { signOut, masterId } = useAuth();
    const { width } = useWindowDimensions();
    const { pathname, search } = useLocation();
    const isMobile = width < breakpoints.TABLET;
    const isFirefoxDesktop = isFireFox() && width >= breakpoints.LAPTOP_L;
    const navigate = useNavigate();
    const timer = useRef<NodeJS.Timeout | null>(null);

    const { openModal, modalType, closeModal, contextData } = useModalManager<
      ModalType,
      ModalContext
    >();

    const { toggleHelpPanel } = useHelpPanel();

    const [activeEvent, setActiveEvent] = useState<Event | undefined>();
    const [isOpenSideModal, setIsOpenSideModal] = useState<
      MainHeaderSideModalOpenStatus | false
    >(false);
    const [isOpenEventModal, setIsOpenEventModal] = useState<
      MainHeaderEventModalOpenStatus | false
    >(false);
    const [tokenNotification, setTokenNotification] =
      useState<NotificationFragment | null>(null);
    const { eventDetails } = useSocialHallEvent();
    const showFeature: boolean = false;

    const isSocialHallUri = useIsSocialHallUrl();

    useEffect(
      () => () => {
        if (timer.current) clearTimeout(timer.current);
      },
      [],
    );

    const help = document.querySelector<HTMLIFrameElement>('#launcher-frame');
    useEffect(() => {
      if (help) {
        setCSSStyles(help, { ...defaultStyles, display: 'none' });
      }
      return () => resetHelpStyles();
    }, [help]);

    const displayName = useMemo(() => {
      const SCREEN_BREAK_POINT = 1024;
      let name = userName;
      if (width >= SCREEN_BREAK_POINT && userName.length > 20) {
        name = `${userName.substring(0, 17)}...`;
      }
      if (width < SCREEN_BREAK_POINT && userName.length > 10) {
        name = `${userName.substring(0, 7)}...`;
      }
      return name;
    }, [userName, width]);

    const handleLogoClick = useCallback(() => {
      if (isSocialHallUri) {
        window.open(ROUTES.HOME, '_blank');
      } else {
        navigate(ROUTES.HOME);
      }
    }, [navigate, isSocialHallUri]);

    const handleSearchClick = useCallback(() => {
      navigate(ROUTES.SEARCH);
    }, [navigate]);

    const handleCloseSideModal = useCallback(
      (openStatus: MainHeaderSideModalOpenStatus) => {
        if (isOpenSideModal === openStatus) {
          setIsOpenSideModal(false);
        }
      },
      [isOpenSideModal],
    );

    const handleOpenSideModal = useCallback(
      (openStatus: MainHeaderSideModalOpenStatus) =>
        setIsOpenSideModal(openStatus),
      [],
    );

    const handleCloseEventModal = useCallback(
      (openStatus: MainHeaderEventModalOpenStatus) => {
        if (isOpenEventModal === openStatus) {
          setIsOpenEventModal(false);
          setActiveEvent(undefined);
        }
      },
      [isOpenEventModal],
    );

    const handleEditEvent = useCallback(
      (event: EventFragment, callback?: () => void) => {
        openModal('create-edit-event', { event, callback });
        handleCloseSideModal('calendar');
      },
      [handleCloseSideModal, openModal],
    );

    const handleOpenEventDetail = useCallback(
      (event?: Maybe<Event>) => {
        if (event) {
          setActiveEvent(event);
          setIsOpenEventModal('detail');
        }
        handleCloseSideModal('notification');
      },
      [handleCloseSideModal],
    );

    const handleCloseTokenNotification = useCallback(async () => {
      if (tokenNotification) {
        setTokenNotification(null);
      }
    }, [tokenNotification]);

    const handleMessageClick = useCallback(() => {
      if (isSocialHallUri) {
        window.open(ROUTES.MESSAGES, '_blank');
      } else {
        navigate(ROUTES.MESSAGES);
      }
    }, [navigate, isSocialHallUri]);

    setTimeout(() => setHelperPosition(), 0);

    const onSelectMenu = (value: string) => {
      if (value === 'HELP') {
        toggleHelpPanel();
      } else if (value === 'LOGOUT') {
        onSignOut();
      } else if (isSocialHallUri) {
        window.open(value, '_blank');
      } else {
        navigate(value);
      }
    };

    useEffect(() => {
      const LIVE_EVENTS = ['GOLIVE', 'LIVE', 'PRE_LIVE', 'PRE_EVENT'];
      const query = new URLSearchParams(search);
      const socialHallEvent =
        pathname === ROUTES.HOME &&
        query.get('calendar') &&
        query.get('calendar') !== '';

      if (socialHallEvent && eventDetails) {
        const { status, socialHall, privacy } = eventDetails;
        if (privacy !== Privacy.Invitation) {
          if (status && LIVE_EVENTS.includes(status))
            navigate(`/social-hall/${socialHall?._id}`);
          else handleOpenSideModal('calendar');
        } else {
          // TODO
        }
      }
    }, [pathname, search, handleOpenSideModal, eventDetails, navigate]);

    const onSignOut = useCallback(() => {
      if (isSocialHallUri) {
        onExitSocialHallCall();
      }
      signOut();
    }, [signOut, isSocialHallUri, onExitSocialHallCall]);

    return (
      <MainHeaderWrapper id="main-header" ref={ref}>
        <Stack gap={24} align="center">
          {onMenuButtonClick && (
            <Button
              size="small"
              neutral
              onClick={onMenuButtonClick}
              icon={<Icon name="menu_m" size={24} />}
            />
          )}
          <Logo handleLogoClick={handleLogoClick} />
        </Stack>
        <SearchWrapper>
          <GlobalSearch setResults={setSearchResult} type={searchFilter} />
        </SearchWrapper>
        <NotificationWrapper>
          <IconContainer onClick={handleSearchClick} className="xs-block">
            <NotificationsIcon
              name="search_m"
              size={24}
              color="--icon-top-nav-global-element-neutral-highlighted"
            />
          </IconContainer>
          {/* TODO: Not used, to remove. */}
          {coins > 0 && (
            <IconContainer>
              <Icon
                name="coin_m"
                size={24}
                color="--icon-top-nav-global-element-neutral-highlighted"
              />
              <MainHeaderLabel>{coins}</MainHeaderLabel>
            </IconContainer>
          )}
          {!!flags.noumsSocialHall && (
            <IconContainer
              onClick={() => handleOpenSideModal('calendar')}
              isDisabled={false}
            >
              <NotificationsIcon
                name="calendar_xs"
                size={24}
                color="--icon-top-nav-global-element-neutral-highlighted"
              />
              {calendars > 0 && (
                <BadgeContainer>
                  <NotificationBadge text={`${calendars}`} />
                </BadgeContainer>
              )}
            </IconContainer>
          )}

          <AlertNotificationsList />

          <IconContainer
            onClick={() => {
              // Additional trigger for push notifications permission.
              // Necessary for newest Firefox. Other browsers will eventually require the same trick.
              if ('Notification' in window) {
                window.Notification.requestPermission().catch((err) => {
                  // eslint-disable-next-line no-console
                  console.log('Push notifications permission - error', err);
                });
              }

              handleOpenSideModal('notification');
            }}
          >
            <NotificationsIcon
              name="notifications_m"
              size={24}
              color="--icon-top-nav-global-element-neutral-highlighted"
            />
            {notifications > 0 && (
              <BadgeContainer>
                <NotificationBadge text={`${notifications}`} />
              </BadgeContainer>
            )}
          </IconContainer>
          <IconContainer onClick={handleMessageClick}>
            <NotificationsIcon
              name="message_m"
              size={24}
              color="--icon-top-nav-global-element-neutral-highlighted"
            />
            {messages > 0 && (
              <BadgeContainer>
                <NotificationBadge text={`${messages}`} />
              </BadgeContainer>
            )}
          </IconContainer>
          <Dropdown
            hideIcons
            placement="bottom-end"
            options={MenuOptions}
            containerWidth={isFirefoxDesktop ? '162px' : '142px'}
            containerPadding="11.3px 4px 11.3px 12px"
            isAnimation={false}
            observerMinHeight="0px"
            padding="0px"
            onSelectOption={(option) => onSelectMenu(option.value)}
            usePopStyle={true}
            usePortal={true}
          >
            {({ targetRef, toggle }: DropdownTargetProps<HTMLDivElement>) => (
              <DropdownPicker ref={targetRef} onClick={toggle}>
                <IconContainer className="mr-0">
                  <Avatar size="M" url={avatar} />
                  {userName && (
                    <MainHeaderLabel marginLeft={8} title={userName}>
                      {displayName}
                    </MainHeaderLabel>
                  )}
                  {!isMobile && (
                    <>
                      <Spacer width={16} />
                      <Icon
                        name="chevron_down_m"
                        size={16}
                        onClick={toggle}
                        color="--icon-top-nav-global-element-neutral-highlighted"
                      />
                    </>
                  )}
                </IconContainer>
              </DropdownPicker>
            )}
          </Dropdown>
          {/* TODO: Not used, to remove. */}
          {showFeature && (
            <>
              <div
                style={{ border: 'solid orange 2px' }}
                data-id="logout-spacer-for-help"
              >
                <Icon
                  name="question"
                  size={24}
                  color="--icon-top-nav-global-element-neutral-highlighted"
                />
                HELP
              </div>
              <LogoutContainer data-id="logout-button">
                <Logout size="small" onClick={onSignOut}>
                  {t('noumena.header.logout_button.text')}{' '}
                </Logout>
                <LogoutIcon
                  name="door_m"
                  size={24}
                  onClick={onSignOut}
                  color="--icon-top-nav-global-element-neutral-highlighted"
                />
              </LogoutContainer>
            </>
          )}
        </NotificationWrapper>
        <EventListModal
          isOpen={isOpenSideModal === 'calendar'}
          onClose={() => handleCloseSideModal('calendar')}
          onEditEvent={handleEditEvent}
        />
        <NotificationsSidebar
          open={isOpenSideModal === 'notification'}
          onClose={() => handleCloseSideModal('notification')}
          onClickEvent={handleOpenEventDetail}
          handleTokenNotification={setTokenNotification}
        />
        {isOpenEventModal === 'detail' && (
          <EventDetailModal
            eventId={activeEvent?._id ?? ''}
            isOpen={isOpenEventModal === 'detail'}
            onClose={() => handleCloseEventModal('detail')}
            onEditEvent={handleEditEvent}
          />
        )}
        {modalType === 'create-edit-event' && (
          <CreateEditEvent
            isOpen
            onClose={closeModal}
            chamberId={masterId}
            isProjectNoum={false}
            event={contextData?.event!}
            eventSuccessCallback={contextData?.callback!}
          />
        )}
        {tokenNotification && (
          <TokenNotification
            isOpen={!!tokenNotification}
            tokens={tokenNotification.data?.count ?? 0}
            reason={tokenNotification.data?.message ?? ''}
            handleClose={handleCloseTokenNotification}
          />
        )}
      </MainHeaderWrapper>
    );
  },
);

export const MainHeader = forwardRef(
  (props: MainHeaderContainerProps, ref: Ref<HTMLDivElement>) => {
    const { user, masterId } = useAuth();
    const { setAppBadge } = useAppBadge();

    const { unviewedNotificationsCount } = useUnreadNotificationsCount({
      pollInterval: 10000,
      skip: !user?._id,
    });

    const { data: invitedEventsCountData, refetch } =
      useGetInvitedEventsCountQuery({
        skip: !masterId,
        variables: {
          chamberId: masterId || '',
        },
      });

    const { data: eventSubscriptionData } = useEventsSubscription({
      skip: !user?._id,
      variables: { userId: user?._id || '' },
    });
    const { unreadConversationsCount } = useContext(
      ConversationUnreadStatusContext,
    );

    useEffect(() => {
      refetch();
    }, [eventSubscriptionData, unviewedNotificationsCount, refetch]);

    const invitedEventsCount = invitedEventsCountData?.getEvents?.count ?? 0;

    useLayoutEffect(() => {
      setAppBadge(
        unviewedNotificationsCount +
          invitedEventsCount +
          unreadConversationsCount,
      );
    }, [
      invitedEventsCount,
      setAppBadge,
      unreadConversationsCount,
      unviewedNotificationsCount,
    ]);

    return (
      <MainHeaderInner
        ref={ref}
        {...props}
        notifications={unviewedNotificationsCount}
        calendars={invitedEventsCount}
        messages={unreadConversationsCount}
      />
    );
  },
);
