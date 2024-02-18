import { Spinner } from '@/components/Spinner';
import Icon from '../../Icon/Icon';
import { type SideNavItemProps } from './types';
import { IconWrapper, SideNavItemContainer, StyledLabel } from './styles';

const defaultNoRoute = '#';
export const SideNavItem = ({
  icon,
  label,
  onItemChange,
  active = false,
  value,
  disabled = false,
  to = defaultNoRoute,
  isNoumSideBar = false,
  loading,
  ...rest
}: SideNavItemProps) => {
  const handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (onItemChange) {
      onItemChange(value);
    }
  };

  return (
    <SideNavItemContainer
      to={to}
      onClick={handleOnClick}
      active={active ? 1 : 0}
      disabled={!!disabled}
      data-testid="Nav-item-container"
      $isNoumSideBar={isNoumSideBar}
      {...rest}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {icon && (
            <IconWrapper
              active={active}
              disabled={!!disabled}
              data-testid="Nav-icon-wrapper"
            >
              <Icon
                data-testid="Nav-icon"
                name={icon}
                color={
                  active && !disabled
                    ? '--icon-main-nav-brand-primary-selected'
                    : '--icon-button-neutral-default'
                }
                size={24}
              />
            </IconWrapper>
          )}
          <StyledLabel
            id="Nav-label"
            active={active}
            disabled={!!disabled}
            data-testid="Nav-label"
          >
            {label}
          </StyledLabel>
        </>
      )}
    </SideNavItemContainer>
  );
};
