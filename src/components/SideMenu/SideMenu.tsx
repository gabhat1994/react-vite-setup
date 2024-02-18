import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ROUTES from '@/constants/routes';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import { LINKS } from '@/constants/links';
import { Env } from '@/constants/env';
import { useHelpPanel } from '@/hooks/helpPanel';
import InviteFriendSideMenuSection from './InviteFriendSideMenuSection';
import { SideMenuItemContent } from './SideMenuItem/styles';
import { TSpan } from '../Typography';
import { SideMenuItem } from './SideMenuItem/SideMenuItem';
import { type SideMenuProps } from './types';
import {
  MenuFooterItem,
  MyAccount,
  MyAccountHeader,
  ScrollSection,
  SideBorder,
  SideBorderMain,
  SideMenuContainer,
  SideMenuFooterLinksContainer,
  StyledStack,
  StyledStaticLabel,
  VersionContainer,
} from './styles';
import { SIDE_MENU_ITEM_HEIGHT } from './SideMenuItem/utils';

export const SideMenu = ({
  navItems = [],
  navItemsMore = [],
  onNavChange,
  handleClose,
  isUserPending,
}: SideMenuProps) => {
  const windowSize = useWindowDimensions();
  const laptopWidth = breakpoints.LAPTOP_L;
  const vertical = windowSize.width >= laptopWidth;
  const { t } = useTranslation();
  const pathName = window.location.pathname;
  const { toggleHelpPanel } = useHelpPanel();

  const activeItemIndex = useMemo(
    () => navItems.findIndex((item) => item.value === pathName),
    [navItems, pathName],
  );
  const activeItemIndexMore = useMemo(
    () => navItemsMore.findIndex((item) => item.value === pathName),
    [navItemsMore, pathName],
  );
  const offsetY =
    (activeItemIndex !== -1 ? activeItemIndex : activeItemIndexMore + 3) *
    SIDE_MENU_ITEM_HEIGHT;

  const onClickHelpButton = () => {
    toggleHelpPanel();
  };

  return (
    <SideMenuContainer data-testid="Side-Menu-Container">
      <MyAccountHeader>
        <MyAccount>
          <TSpan
            font="heading-m-bold"
            colorToken="--text-card-header-neutral-highlighted"
          >
            {t('noumena.myaccount.title')}
          </TSpan>
        </MyAccount>
        {windowSize.width <= breakpoints.TABLET_L && (
          <Icon
            name="close_m"
            size={24}
            onClick={handleClose}
            color="--icon-tablecell-neutral-highlighted"
          />
        )}
      </MyAccountHeader>
      <Spacer height={24} />
      <ScrollSection>
        <InviteFriendSideMenuSection
          marginLeft="24px"
          handleClick={handleClose}
          paddingLeft="16px"
          disabled={isUserPending}
        />
        <Spacer height={24} />
        <StyledStack align="center" vertical={vertical} fullWidth={vertical}>
          {pathName !== ROUTES.INVITES_FRIENDS && (
            <SideBorderMain>
              <motion.div
                animate={{ y: offsetY }}
                transition={{ type: 'spring' }}
              >
                <SideBorder pathName={pathName} />
              </motion.div>
            </SideBorderMain>
          )}
          {navItems.map(({ value, external, ...rest }) => (
            <SideMenuItem
              data-testid="Side-Menu-Item"
              key={value}
              active={value === pathName}
              onItemChange={onNavChange}
              value={value}
              external={external}
              {...rest}
            />
          ))}
          <SideMenuItemContent onClick={() => onNavChange(LINKS.PRIVACY, true)}>
            <Icon
              data-testid="Nav-icon"
              name="privacy_policy_m"
              color="--icon-tablecell-neutral-default"
              size={24}
            />
            <StyledStaticLabel>
              <TSpan
                font="body-l-bold"
                colorToken="--text-tablecell-header-neutral-default"
                data-testid="privacy"
              >
                {t(`noumena.myaccount.privacy_policy`)}
              </TSpan>
            </StyledStaticLabel>
            <Icon
              name="chevron_right_m"
              color="--icon-tablecell-neutral-default"
              size={16}
            />
          </SideMenuItemContent>
          {navItemsMore.map(({ value, external, ...rest }) => (
            <SideMenuItem
              data-testid="Side-Menu-Item"
              key={value}
              active={value === pathName}
              onItemChange={onNavChange}
              value={value}
              external={external}
              {...rest}
            />
          ))}
          <SideMenuItemContent onClick={() => onNavChange(LINKS.TERMS, true)}>
            <Icon
              data-testid="Nav-icon"
              name="terms_m"
              color="--icon-tablecell-neutral-default"
              size={24}
            />
            <StyledStaticLabel>
              <TSpan
                data-testid="terms"
                colorToken="--text-tablecell-header-neutral-default"
                font="body-l-bold"
              >
                {t(`noumena.myaccount.terms_of_use`)}
              </TSpan>
            </StyledStaticLabel>
            <Icon
              name="chevron_right_m"
              color="--icon-tablecell-neutral-default"
              size={16}
            />
          </SideMenuItemContent>
        </StyledStack>
        <Spacer height={95} />
        <SideMenuFooterLinksContainer>
          <MenuFooterItem>
            <Button
              leftIcon={
                <Icon
                  name="question"
                  size={25}
                  color="--icon-tablecell-neutral-highlighted"
                />
              }
              textOnly
              onClick={onClickHelpButton}
            >
              <TSpan
                font="body-l-bold"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                {t('noumena.header.menu.help')}
              </TSpan>
            </Button>
          </MenuFooterItem>
          <VersionContainer>
            {t('noumena.myaccount.version', {
              version: Env.packageVersion,
            })}
          </VersionContainer>
        </SideMenuFooterLinksContainer>
      </ScrollSection>
    </SideMenuContainer>
  );
};

export default SideMenu;
