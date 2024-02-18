import { Icon } from '@/components/Icon';
import { ElementUtils } from '@/utils/element';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { t } from 'i18next';
import { ControlPanelIcon, WrapperIcon } from '../Styles';
import { type ControlPanelProps, ToolbuttonEdge } from '../types';
import { getActionButtonColorToken } from '../utils';

const Visibility = ({ tool, toolTip, isDisabled }: ControlPanelProps) => {
  const { updateCustomPreviewElements } = useEditChamberState();
  const { bgColor, hoverColor } = getActionButtonColorToken(true);
  const isCustomPreviewVisible =
    !!tool && ElementUtils.isCustomPreviewVisible(tool);
  const handleCPVisibilityChange = () => {
    if (tool?._id && updateCustomPreviewElements) {
      updateCustomPreviewElements([
        { _id: tool._id, isCustomPreviewVisible: !isCustomPreviewVisible },
      ]);
    }
  };
  return (
    <ControlPanelIcon
      cursorAllowed={!isDisabled}
      isEdge={ToolbuttonEdge.topRight}
      bgColor={bgColor}
      hoverColor={hoverColor}
      onClick={handleCPVisibilityChange}
      data-title={toolTip || t('noumena.noum_editor.hover_controls_hide')}
    >
      <WrapperIcon
        isEdge="right"
        aria-label="visibility_button"
        disabled={isDisabled}
      >
        <Icon
          size={16}
          name="eye_off_solid_m"
          color="--icon-button-neutral-alt-default"
        />
      </WrapperIcon>
    </ControlPanelIcon>
  );
};
export default Visibility;
