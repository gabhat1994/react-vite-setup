import { useCallback, useState } from 'react';
import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { useRemoveSectionHelper } from '@/features/noums/hooks/spaceQuery';
import { ElementStatusEnum, ElementTypeEnum } from '@/apollo/generated/types';
import { useSubWalletDeleteHelper } from '@/features/money/hooks';
import { NonZeroWalletModal } from '@/screens/Chamber/components/modals/NonZeroWalletModal';
import { ElementUtils } from '@/utils/element';
import { SectionToolType } from '@/features/noums/noumEditor/shared/constants';
import { NonRemovableDeleteModal } from '@/features/noums/noumEditor/components/NonRemovableDeleteModal';
import { type ControlPanelProps, ToolbuttonEdge } from '../types';
import { ControlPanelIcon, WrapperIcon } from '../Styles';

const Delete = ({
  isTool,
  section,
  id,
  isDisabled,
  tool,
}: ControlPanelProps) => {
  const { handleDeleteModal, space, setNoumSidePanelId, setActiveEditingTool } =
    useEditChamberState();
  const [showNonZeroWalletModal, setShowNonZeroWalletModal] = useState(false);
  const [showNonRemovableModal, setShowNonRemovableModal] = useState(false);
  const { removeSectionHelper } = useRemoveSectionHelper();

  const { subWalletDeleteHelper } = useSubWalletDeleteHelper();

  const regularDeleteFlow = useCallback(() => {
    if (id) {
      setActiveEditingTool?.(tool);
      handleDeleteModal?.(
        isTool ? SectionToolType.TOOL_TYPE : SectionToolType.SECTION_TYPE,
        id,
      );
    }
  }, [handleDeleteModal, id, isTool, setActiveEditingTool, tool]);

  const handleCloseNonZeroWalletModal = useCallback(() => {
    setShowNonZeroWalletModal(!showNonZeroWalletModal);
  }, [showNonZeroWalletModal]);

  const nonRemovableTools = useCallback(
    () => ElementUtils.nonRemovableTools(section?.columns || []),
    [section?.columns],
  );

  const deleteHandler = useCallback(
    async (e) => {
      e.stopPropagation();
      if (isDisabled) return;
      if (nonRemovableTools().length > 0 && !isTool) {
        setShowNonRemovableModal(true);
        return;
      }
      const isToolExist = section?.columns.find(
        (item) => item.tools.length > 0,
      );
      if (isToolExist) {
        if (
          tool?.elementType === ElementTypeEnum.Wallet &&
          tool.status === ElementStatusEnum.Published
        ) {
          subWalletDeleteHelper(
            space?._id,
            regularDeleteFlow,
            handleCloseNonZeroWalletModal,
          );
        } else {
          regularDeleteFlow();
        }
      } else {
        if (!space?._id || !section) return;
        const isRemoved = await removeSectionHelper(section, space._id);
        if (isRemoved) {
          setNoumSidePanelId?.(undefined);
        }
      }
    },
    [
      isDisabled,
      nonRemovableTools,
      isTool,
      section,
      tool?.elementType,
      tool?.status,
      subWalletDeleteHelper,
      space?._id,
      regularDeleteFlow,
      handleCloseNonZeroWalletModal,
      removeSectionHelper,
      setNoumSidePanelId,
    ],
  );

  return (
    <>
      <ControlPanelIcon
        cursorAllowed={!isDisabled}
        onClick={(e) => deleteHandler(e)}
        data-title={
          isDisabled
            ? t('noumena.noum_editor.hover_controls_not_delete')
            : t('noumena.noum_editor.hover_controls_delete')
        }
        isEdge={ToolbuttonEdge.topRight}
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
        <WrapperIcon isEdge="right" aria-label="delete_button">
          <Icon
            size={16}
            name="delete_m"
            color="--icon-button-neutral-alt-default"
          />
        </WrapperIcon>
      </ControlPanelIcon>
      <NonZeroWalletModal
        isOpen={showNonZeroWalletModal}
        handleClose={handleCloseNonZeroWalletModal}
      />
      <NonRemovableDeleteModal
        isOpen={showNonRemovableModal}
        onClose={() => setShowNonRemovableModal(false)}
        nonRemovableToolList={nonRemovableTools()}
      />
    </>
  );
};
export default Delete;
