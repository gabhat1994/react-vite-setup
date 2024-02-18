import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { ControlPanelIcon, WrapperIcon } from '../Styles';
import { type ControlPanelProps } from '../types';
import { SectionToolType } from '../../../shared/constants';

const Edit = ({ isTool, id, tool, isDisabled }: ControlPanelProps) => {
  const { handleEditModal, noumSidePanelId, setNoumSidePanelId } =
    useEditChamberState();

  const clickedHandler = () => {
    if (noumSidePanelId && id === noumSidePanelId) {
      setNoumSidePanelId?.(undefined);
    } else {
      handleEditModal?.(
        isTool ? SectionToolType.TOOL_TYPE : SectionToolType.SECTION_TYPE,
        id!,
        tool,
      );
    }
  };

  return (
    <ControlPanelIcon
      cursorAllowed={!isDisabled}
      onClick={(e) => {
        e.stopPropagation();
        if (isDisabled) return;
        clickedHandler();
      }}
      data-title={
        isDisabled
          ? t('noumena.noum_editor.hover_controls_not_edit')
          : t('noumena.noum_editor.hover_controls_edit')
      }
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
    >
      <WrapperIcon aria-label="edit_button">
        <Icon
          size={16}
          name="edit_m"
          color="--icon-button-neutral-alt-default"
        />
      </WrapperIcon>
    </ControlPanelIcon>
  );
};

export default Edit;
