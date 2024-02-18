import { useCallback } from 'react';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { type SideMenuItemProps } from './types';
import {
  SideMenuItemContainer,
  StyledLabel,
  SideMenuItemContent,
} from './styles';

const defaultNoRoute = '#';
export const SideMenuItem = ({
  icon,
  label,
  onItemChange,
  active = false,
  value,
  disabled = false,
  to = defaultNoRoute,
  external = false,
  setIsShown,
  ...rest
}: SideMenuItemProps) => {
  const handleOnClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (onItemChange) {
        onItemChange(value, external || false);
      }
      if (setIsShown) {
        setIsShown(false);
      }
    },
    [disabled, onItemChange, setIsShown, value, external],
  );
  return (
    <SideMenuItemContainer
      to={to}
      onClick={handleOnClick}
      data-testid="Nav-item-container"
      {...rest}
    >
      <SideMenuItemContent>
        {icon && (
          <Icon
            data-testid="Nav-icon"
            name={icon}
            color={
              active && !disabled
                ? '--icon-tablecell-neutral-highlighted'
                : '--icon-tablecell-neutral-default'
            }
            size={24}
          />
        )}
        <StyledLabel
          active={active}
          disabled={!!disabled}
          data-testid="Nav-label"
        >
          <TSpan
            font="body-l-bold"
            colorToken={
              active
                ? '--text-tablecell-header-neutral-highlighted'
                : '--text-tablecell-header-neutral-default'
            }
          >
            {label}
          </TSpan>
        </StyledLabel>
        <Icon
          name="chevron_right_m"
          size={16}
          color={
            active && !disabled
              ? '--icon-tablecell-neutral-highlighted'
              : '--icon-tablecell-neutral-default'
          }
        />
      </SideMenuItemContent>
    </SideMenuItemContainer>
  );
};
