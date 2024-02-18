import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { ControlPanelIcon, WrapperIcon } from '../Styles';
import { type PlusButtonProps, ToolbuttonEdge } from '../types';

const PlusTop = ({ onClick }: PlusButtonProps) => (
  <ControlPanelIcon
    cursorAllowed
    onClick={(e) => {
      e.stopPropagation();
      onClick!();
    }}
    data-title={t('noumena.noum_editor.hover_controls_add_tool_above')}
    isEdge={ToolbuttonEdge.bothTop}
    bgColor="var(--bg-tool-toolbox-brand-primary-default)"
    hoverColor="var( --bg-tool-toolbox-brand-primary-hover)"
  >
    <WrapperIcon aria-label="plus_top_button">
      <Icon size={16} name="plus_m" color="--icon-button-neutral-alt-default" />
    </WrapperIcon>
  </ControlPanelIcon>
);

export default PlusTop;
