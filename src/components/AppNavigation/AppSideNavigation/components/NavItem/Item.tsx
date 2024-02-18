import { AnimatedGlassIcon } from '@/components/GlassIcon';
import { Icon } from '@/components/Icon';
import { useElementFocus } from '@/hooks/elementFocus';
import { type AriaAttributes, type AriaRole } from 'react';
import { type NavItemOption } from '@/components/AppNavigation/types';
import { type NavItemsListVariant } from '../../types';
import S from '../styles';
import { Tooltip, useTooltip } from '../../../Tooltip';

interface NavItemsListItemProps extends AriaAttributes {
  item: NavItemOption;
  isActive?: boolean;
  showIconOnly?: boolean;
  showTooltip?: boolean;
  variant: NavItemsListVariant;
  onClick?(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    item: NavItemOption,
  ): void;
  role?: AriaRole;
}
export function NavItemItem({
  item,
  showIconOnly,
  showTooltip,
  isActive = false,
  variant,
  role = 'listitem',
  onClick,
  ...ariaAttributes
}: NavItemsListItemProps) {
  const { isFocused, focusHandlers } = useElementFocus();
  const tooltip = useTooltip<HTMLButtonElement>();

  const hasSubNav = !!item.subNavItems && item.subNavItems.length > 0;

  return (
    <AnimatedGlassIcon.Provider isActive={isActive}>
      {(iconTriggerProps) => (
        <S.NavItemLi role={role}>
          <S.NavItemButton
            ref={tooltip.triggerProps.ref}
            $variant={variant}
            $isActive={isFocused || isActive}
            aria-label={item.label}
            tabIndex={0}
            {...ariaAttributes}
            {...focusHandlers}
            onMouseEnter={(e) => {
              iconTriggerProps.onMouseEnter(e);
              tooltip.triggerProps.onMouseEnter();
            }}
            onMouseLeave={(e) => {
              iconTriggerProps.onMouseLeave(e);
              tooltip.triggerProps.onMouseLeave();
            }}
            onClick={(e) => {
              if (onClick) {
                e.stopPropagation();
                onClick(e, item);
              }
            }}
          >
            <S.NavItemIndicator />
            {item.iconName && (
              <AnimatedGlassIcon.AnimatedIcon
                name={item.iconName}
                size={variant === 'nav' ? 28 : 24}
                rotate
              />
            )}
            {showIconOnly ? (
              hasSubNav ? (
                <S.NavItemChevronContainer>
                  <Icon name="chevron_small_right_m" size={16} />
                </S.NavItemChevronContainer>
              ) : null
            ) : (
              <S.NavItemLabel>{item.label}</S.NavItemLabel>
            )}
            {showTooltip && (
              <Tooltip {...tooltip.tooltipProps}>{item.label}</Tooltip>
            )}
          </S.NavItemButton>
        </S.NavItemLi>
      )}
    </AnimatedGlassIcon.Provider>
  );
}
