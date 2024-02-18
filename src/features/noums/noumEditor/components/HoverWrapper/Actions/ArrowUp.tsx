import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { ControlPanelIcon, WrapperIcon } from '../Styles';
import { type ControlPanelProps, ToolbuttonEdge } from '../types';
import { getActionButtonColorToken } from '../utils';

const ArrowUp = ({
  onUpClick,
  provided,
  currentIndex,
  isTool,
  isDisabled,
}: ControlPanelProps) => {
  const disabled = isDisabled || currentIndex === 0;

  const clickedHandler = () => {
    if (!disabled) onUpClick?.();
  };

  const { bgColor, hoverColor } = getActionButtonColorToken(isTool, isDisabled);

  return (
    <ControlPanelIcon
      cursorAllowed
      onClick={(e) => {
        e.stopPropagation();
        clickedHandler();
      }}
      data-title={t('noumena.noum_editor.hover_controls_arrow_up')}
      isEdge={ToolbuttonEdge.topLeft}
      bgColor={bgColor}
      hoverColor={hoverColor}
    >
      <WrapperIcon
        aria-label="arrow_up_button"
        ref={provided?.innerRef}
        disabled={disabled}
        {...provided?.dragHandleProps}
      >
        <Icon
          size={16}
          name="arrow_up_m"
          color="--icon-button-neutral-alt-default"
        />
      </WrapperIcon>
    </ControlPanelIcon>
  );
};

export default ArrowUp;
