import { useMemo } from 'react';
import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { ControlPanelIcon, WrapperIcon } from '../Styles';
import { type ControlPanelProps } from '../types';
import { getActionButtonColorToken } from '../utils';

const ArrowDown = ({
  onDownClick,
  provided,
  currentIndex,
  totalIndex,
  isTool,
}: ControlPanelProps) => {
  const isDisabled = useMemo(
    () => currentIndex === totalIndex,
    [currentIndex, totalIndex],
  );

  const clickedHandler = () => {
    if (!isDisabled) onDownClick?.();
  };

  const { bgColor, hoverColor } = getActionButtonColorToken(isTool, isDisabled);

  return (
    <ControlPanelIcon
      cursorAllowed
      onClick={(e) => {
        e.stopPropagation();
        clickedHandler();
      }}
      data-title={t('noumena.noum_editor.hover_controls_arrow_down')}
      bgColor={bgColor}
      hoverColor={hoverColor}
    >
      <WrapperIcon
        aria-label="arrow_down_button"
        ref={provided?.innerRef}
        disabled={isDisabled}
        {...provided?.dragHandleProps}
      >
        <Icon
          size={16}
          name="arrow_down_m"
          color="--icon-button-neutral-alt-default"
        />
      </WrapperIcon>
    </ControlPanelIcon>
  );
};

export default ArrowDown;
