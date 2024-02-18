import { useState, type FC, type HTMLAttributes } from 'react';
import { Icon } from '@/components/Icon';
import { type Icons } from '@/components/Icon/Icon';
import { TooltipBase, IconBase, MessageBase } from './styles';

type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  top: number;
  left: number;
  icon?: keyof typeof Icons;
  iconSize?: number;
  iconColor?: string;
  width?: number;
  children: JSX.Element | string;
};

const Tooltip: FC<TooltipProps> = ({
  icon,
  iconSize,
  iconColor,
  top,
  left,
  width,
  children,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isTouchDevice = !!navigator.maxTouchPoints;

  const onMouseEnter = () => {
    if (isTouchDevice) return;
    setShowTooltip(true);
  };
  const onMouseLeave = () => {
    if (isTouchDevice) return;
    setShowTooltip(false);
  };

  const onIconClick = () => {
    if (!isTouchDevice) return;
    setShowTooltip(!showTooltip);
  };

  return (
    <TooltipBase>
      <IconBase
        onClick={onIconClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        <Icon
          name={icon ?? 'info_m'}
          size={iconSize ?? 18}
          color={iconColor ?? '--icon-card-neutral-default'}
        />
      </IconBase>
      {showTooltip && (
        <MessageBase top={top} left={left} width={width}>
          {children}
        </MessageBase>
      )}
    </TooltipBase>
  );
};

export { TooltipMessage } from './TooltipMessage';

export default Tooltip;
