import { useSubNavTrigger } from '@/components/AppNavigation/SubNav/useSubNavTrigger';
import { Separator } from '@/components/Separator/Separator';
import { Stack, StackItem } from '@/layout';
import { useAppSideNavigationContext } from '../../contexts/AppSideNavigationContext';
import { BackButton } from '../BackButton';
import { CreateButton } from '../CreateButton';
import { NavExpandingToggler } from '../NavExpandingToggler';
import { NavItemsList } from '../NavItemsList';
import S from '../styles';

export function SideNavigationPersistent() {
  const { isExpanded, onGoBack, createNavItem, mainNavItems, toolsNavItems } =
    useAppSideNavigationContext();

  const { getSubNavTriggerProps } = useSubNavTrigger();

  const createNavTriggerProps = getSubNavTriggerProps(createNavItem);
  const showBackButton = typeof onGoBack === 'function';

  return (
    <S.PersistentContainer
      $isExpanded={isExpanded}
      role="navigation"
      id="AppSideNavigation"
    >
      {isExpanded ? (
        <Stack gap={16} grow vertical align="stretch">
          <S.Padding left right id={createNavTriggerProps.id}>
            <Stack grow gap={8} align="center">
              {showBackButton && <BackButton title="Back" onClick={onGoBack} />}
              <CreateButton
                item={createNavItem}
                onClick={createNavTriggerProps.onClick}
              />
            </Stack>
          </S.Padding>

          <S.Padding left right>
            <Separator noMargin />
          </S.Padding>

          <Stack gap={16} vertical align="stretch">
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
        </Stack>
      ) : (
        <>
          {showBackButton && (
            <S.Padding left right>
              <BackButton title="Back" onClick={onGoBack} />
            </S.Padding>
          )}

          <Stack gap={8} grow vertical justify="center" align="center">
            <Stack
              justify="center"
              align="center"
              fullWidth
              id={createNavTriggerProps.id}
            >
              <CreateButton
                item={createNavItem}
                onClick={createNavTriggerProps.onClick}
                showIconOnly
                showTooltip
              />
            </Stack>

            <S.Padding left right>
              <Separator noMargin fullWidth />
            </S.Padding>

            <NavItemsList
              items={[
                ...mainNavItems,
                {
                  key: 'tools',
                  label: 'Tools',
                  iconName: 'tools',
                  subNavItems: toolsNavItems,
                },
              ]}
              showIconsOnly
              showTooltip
            />
          </Stack>
        </>
      )}

      <S.Padding left right>
        <NavExpandingToggler />
      </S.Padding>
    </S.PersistentContainer>
  );
}
