import { useSubNavTrigger } from '@/components/AppNavigation/SubNav/useSubNavTrigger';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Separator } from '@/components/Separator/Separator';
import { SideModal } from '@/components/SideModal';
import { Stack, StackItem } from '@/layout';
import { useAppSideNavigationContext } from '../../contexts/AppSideNavigationContext';
import { CreateButton } from '../CreateButton';
import { NavItem } from '../NavItem';
import { NavItemsList } from '../NavItemsList';
import S from '../styles';

export function SideNavigationDrawer() {
  const {
    isOpen,
    createNavItem,
    mainNavItems,
    toolsNavItems,
    userNavItem,
    onClose,
  } = useAppSideNavigationContext();

  const { getSubNavTriggerProps } = useSubNavTrigger();

  const createNavTriggerProps = getSubNavTriggerProps(createNavItem);

  return (
    <SideModal
      enableAnimation
      open={isOpen}
      placement="left"
      padding={0}
      width="220px"
      mobileWidth="220px"
      onClose={onClose}
      overflowX="visible"
      topOffset={0}
      borderColor="--border-side-navigation-neutral-default"
    >
      {({ onClose: closeModal }) => (
        <Stack
          vertical
          align="stretch"
          gap={16}
          fullWidth
          role="navigation"
          id="AppSideNavigation"
        >
          <S.Padding top left right>
            <Button
              neutral
              size="small"
              onClick={closeModal}
              icon={<Icon name="close_m" size={24} />}
            />
          </S.Padding>

          <S.Padding left right id={createNavTriggerProps.id}>
            <CreateButton
              item={createNavItem}
              onClick={createNavTriggerProps.onClick}
            />
          </S.Padding>

          <S.Padding left right>
            <Separator noMargin />
          </S.Padding>

          <Stack grow gap={16} vertical align="stretch" overflow="auto">
            <NavItemsList items={mainNavItems} />

            <S.Padding left right>
              <Separator noMargin />
            </S.Padding>

            <StackItem>
              <S.Padding left right>
                <S.NavItemsListHeader>TOOLS</S.NavItemsListHeader>
              </S.Padding>

              <NavItemsList items={toolsNavItems} />
            </StackItem>
          </Stack>

          <S.Padding left right bottom {...getSubNavTriggerProps(userNavItem)}>
            <NavItem.UserButton avatarUrl={userNavItem.avatarUrl}>
              {userNavItem.label}
            </NavItem.UserButton>
          </S.Padding>
        </Stack>
      )}
    </SideModal>
  );
}
