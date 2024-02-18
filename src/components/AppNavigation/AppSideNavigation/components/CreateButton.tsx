import { type MouseEventHandler } from 'react';
import { Tooltip, useTooltip } from '../../Tooltip';
import { type NavItemOption } from '../../types';
import { NavItem } from './NavItem';

interface CreateButtonProps {
  item: NavItemOption;
  showIconOnly?: boolean;
  showTooltip?: boolean;
  onClick: MouseEventHandler<HTMLElement>;
}

export function CreateButton({
  item,
  showIconOnly = false,
  showTooltip = false,
  onClick,
}: CreateButtonProps) {
  const tooltip = useTooltip<HTMLButtonElement>({ distance: 16 });

  return (
    <>
      <NavItem.CreateButton
        showIconOnly={showIconOnly}
        {...tooltip.triggerProps}
        onClick={onClick}
        aria-label={item.label}
      >
        {item.label}
      </NavItem.CreateButton>

      <Tooltip
        {...tooltip.tooltipProps}
        isOpen={showTooltip && tooltip.tooltipProps.isOpen}
      >
        {item.label}
      </Tooltip>
    </>
  );
}
