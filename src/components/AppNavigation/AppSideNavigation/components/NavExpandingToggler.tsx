import { Icon } from '@/components/Icon';
import { useSubNavContext } from '../../SubNav/SubNavContext';
import { Tooltip, useTooltip } from '../../Tooltip';
import { useAppSideNavigationContext } from '../contexts/AppSideNavigationContext';
import S from './styles';

export function NavExpandingToggler() {
  const { isExpanded, toggleExpanded } = useAppSideNavigationContext();
  const { close: closeSubNav } = useSubNavContext();

  const tooltip = useTooltip<HTMLButtonElement>({
    distance: 16,
  });

  return (
    <>
      <S.ExpandCollapseButton
        {...tooltip.triggerProps}
        icon={
          <Icon
            name={isExpanded ? 'chevron_small_left_m' : 'chevron_small_right_m'}
            size={24}
          />
        }
        onClick={() => {
          toggleExpanded();
          closeSubNav();
        }}
        id="AppSideNavigation-NavExpandingToggler"
        aria-label={isExpanded ? 'Hide Sidebar' : 'Show Sidebar'}
      />
      <Tooltip {...tooltip.tooltipProps}>
        {isExpanded ? 'Hide Sidebar' : 'Show Sidebar'}
      </Tooltip>
    </>
  );
}
