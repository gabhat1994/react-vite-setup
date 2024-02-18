import { Button } from '@/components/Button';
import Icon, { type IconProps } from '@/components/Icon/Icon';
import { Tooltip, useTooltip } from '../../Tooltip';

interface TopBarIconButtonProps {
  name: IconProps['name'];
  color?: string;
  label?: string;
  textOnly?: boolean;
  onClick?: () => void;
}

export function TopBarIconButton({
  name,
  color,
  label,
  textOnly,
  onClick,
}: TopBarIconButtonProps) {
  const tooltip = useTooltip<HTMLButtonElement>({
    placement: 'bottom',
    distance: 8,
  });

  return (
    <>
      <Button
        {...tooltip.triggerProps}
        neutral
        size="small"
        icon={<Icon name={name} size={24} color={color} />}
        onClick={onClick}
        textOnly={textOnly}
      />
      {label && <Tooltip {...tooltip.tooltipProps}>{label}</Tooltip>}
    </>
  );
}
