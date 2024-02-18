import { type FC, forwardRef, type Ref, useCallback, useMemo } from 'react';
import { t } from 'i18next';
import { useNavigate, useLocation } from 'react-router';
import NonNMDefaultImage from '@/assets/images/non_noumena_member_profile_default.svg';
import ROUTES from '@/constants/routes';
import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import { useAuth } from '@/features/auth/contexts';
import { useToggle, useWindowDimensions } from '@/hooks';
import { Spacer } from '@/layout';
import Logo from '@/components/Logo';
import { EditNonMemberNameModal } from '@/screens/Chamber/components/modals/EditNonMemberNameModal';
import { setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { useIsSocialHallUrl } from '@/hooks/useIsSocialHallUrl';

import {
  IconContainer,
  LinksContainer,
  LinksLabel,
  MainHeaderLabel,
  MainHeaderWrapper,
  NavButton,
  NotificationWrapper,
  LabelWrap,
  LeftContentWrapper,
  GuestHeaderLogoWrapper,
} from '@/components/Header/styles';
import {
  DropdownItemLayout,
  DropDownLabel,
  DropdownPicker,
} from '@/components/Dropdown/styles';
import { ExternalLinks, GuestMenuOptions } from './MenuOptions';
import {
  type GuestHeaderProps,
  type GuestHeaderMenuProps,
  GuestMenuValues,
} from './types';
import { displayNameEllipsis } from './helper';

const Menu: FC<GuestHeaderMenuProps> = ({ options, onSelect, children }) => (
  <Dropdown
    hideIcons
    placement="bottom-end"
    options={options}
    containerWidth="208px"
    containerPadding="11.3px 12px"
    isAnimation={false}
    observerMinHeight="0px"
    padding="0px"
    onSelectOption={(option) => {
      if (onSelect) onSelect(option.value);
    }}
    usePopStyle={true}
    usePortal={true}
    optionsRenderer={(_, handleSelectOption) =>
      options.map((option) => (
        <DropdownItemLayout
          onClick={() => handleSelectOption(option)}
          key={option.key}
        >
          <DropDownLabel labelColor={option.labelColor}>
            <LabelWrap>{option.label}</LabelWrap>
          </DropDownLabel>
        </DropdownItemLayout>
      ))
    }
  >
    {({ targetRef, toggle }: DropdownTargetProps<HTMLDivElement>) => (
      <DropdownPicker ref={targetRef} onClick={toggle}>
        {typeof children === 'function' ? children(toggle) : children}
      </DropdownPicker>
    )}
  </Dropdown>
);

export const GuestHeader = forwardRef(
  (
    {
      userName: incomingUserName = '',
      leftNavButton = false,
      expired = false,
    }: GuestHeaderProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const isSocialHallUrl = useIsSocialHallUrl();
    const { signOut, user, isUnregistered } = useAuth();
    const { width } = useWindowDimensions();
    const navigate = useNavigate();
    const location = useLocation();
    const [isEditNMNameModalOpen, toggleEditNMNameModalOpen] = useToggle(false);
    const userName =
      incomingUserName || `${user?.firstName ?? ''} ${user?.lastName ?? ''} `;
    const sessionExpired = useMemo(
      () => location.pathname === ROUTES.SESSION_EXPIRED,
      [location],
    );

    const navigateHome = useCallback(() => {
      if (sessionExpired) {
        navigate(ROUTES.LOGIN);
      }
      if (user) {
        if (isSocialHallUrl) {
          window.open(ROUTES.GUEST_HOME, '_blank');
        } else {
          navigate(ROUTES.GUEST_HOME);
        }
      } else navigate(ROUTES.LOGIN);
      setLocalStorage(accessLocalStorage.GUEST_REDIRECT_TO_URI);
    }, [isSocialHallUrl, navigate, sessionExpired, user]);

    const displayName = useMemo(
      () => displayNameEllipsis(width, userName),
      [userName, width],
    );

    return (
      <MainHeaderWrapper id="main-header" ref={ref}>
        <LeftContentWrapper>
          <GuestHeaderLogoWrapper data-testid="logo" onClick={navigateHome}>
            {leftNavButton && (
              <NavButton
                size="small"
                tertiary
                icon={
                  <Icon
                    name="arrow_left_m"
                    size={16}
                    color="--icon-button-neutral-default"
                  />
                }
              />
            )}
            <Logo />
          </GuestHeaderLogoWrapper>
          {user && !expired && (
            <Menu
              options={ExternalLinks}
              onSelect={(value) => {
                window?.open(value, '_blank');
              }}
            >
              {({
                toggle,
              }: Pick<DropdownTargetProps<HTMLDivElement>, 'toggle'>) => (
                <LinksContainer>
                  <LinksLabel>
                    {t('noumena.guest.header.links.menu.title.text')}
                  </LinksLabel>
                  <Spacer width={8} />
                  <Icon
                    name="chevron_small_down_m"
                    size={24}
                    onClick={toggle}
                    color="--icon-top-nav-global-element-neutral-highlighted"
                  />
                </LinksContainer>
              )}
            </Menu>
          )}
        </LeftContentWrapper>
        {user && !expired && (
          <NotificationWrapper>
            <Menu
              options={GuestMenuOptions}
              onSelect={(value) => {
                const { LOGOUT, EDIT_DATA } = GuestMenuValues;
                switch (value) {
                  case LOGOUT:
                    setLocalStorage(accessLocalStorage.GUEST_REDIRECT_TO_URI);
                    signOut();
                    break;
                  case EDIT_DATA:
                    toggleEditNMNameModalOpen();
                    break;
                }
              }}
            >
              {({
                toggle,
              }: Pick<DropdownTargetProps<HTMLDivElement>, 'toggle'>) => (
                <>
                  <MainHeaderLabel marginRight={16}>
                    {t('noumena.guest.header.menu.browsing_as.text')}
                  </MainHeaderLabel>
                  <IconContainer className="mr-0">
                    <Avatar size="M" url={NonNMDefaultImage} />
                    {userName && (
                      <MainHeaderLabel marginLeft={8} title={userName}>
                        {displayName}
                      </MainHeaderLabel>
                    )}
                    <Spacer width={8} />
                    <Icon
                      name="chevron_small_down_m"
                      size={18}
                      color="--icon-top-nav-global-element-neutral-highlighted"
                      onClick={sessionExpired ? toggle : () => {}}
                    />
                  </IconContainer>
                </>
              )}
            </Menu>
            {isUnregistered && !sessionExpired && (
              <EditNonMemberNameModal
                isOpen={isEditNMNameModalOpen}
                confirmCallback={toggleEditNMNameModalOpen}
                cancelCallback={toggleEditNMNameModalOpen}
              />
            )}
          </NotificationWrapper>
        )}
      </MainHeaderWrapper>
    );
  },
);
