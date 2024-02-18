import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { ControlPanelIcon, WrapperIcon } from '../Styles';
import { type ControlPanelProps, ToolbuttonEdge } from '../types';

const Move = ({
  isTool,
  provided,
  setOnDragInitiateId,
  id,
}: ControlPanelProps) => (
  <ControlPanelIcon
    cursorAllowed
    onClick={(e) => e.stopPropagation()}
    onMouseDown={() => {
      setOnDragInitiateId?.(id!);
    }}
    data-title={t('noumena.noum_editor.hover_controls_move')}
    isEdge={ToolbuttonEdge.topLeft}
    bgColor={
      isTool
        ? 'var(--bg-tool-toolbox-brand-primary-default)'
        : 'var(--bg-section-toolbox-default)'
    }
    hoverColor={
      isTool
        ? 'var( --bg-tool-toolbox-brand-primary-hover)'
        : 'var(--bg-section-toolbox-hover)'
    }
    {...provided?.dragHandleProps}
  >
    <WrapperIcon aria-label="move_button">
      <Icon size={16} name="move_m" color="--icon-button-neutral-alt-default" />
    </WrapperIcon>
  </ControlPanelIcon>
);

export default Move;
