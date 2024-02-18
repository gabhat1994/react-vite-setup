import { t } from 'i18next';
import { useMemo, useRef } from 'react';
import { SideModal } from '@/components/SideModal';
import { breakpoints } from '@/constants/devices';
import { useClickOutside, useWindowDimensions } from '@/hooks';
import { Icon } from '@/components/Icon';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { ElementUtils } from '@/utils/element';
import {
  SectionToolType,
  elementTitle,
} from '@/features/noums/noumEditor/shared/constants';
import { type ElementTypeEnum } from '@/apollo/generated/types';
import { NoumEditSection } from './NoumEditSection';
import { EditTool } from './EditTool';
import { NoumSidePanelWrapper } from './styles';
import { type SidePanelProps } from './types';

export const NoumSidePanel = ({
  open,
  onClose,
  noumSidePanelType = SectionToolType.SECTION_TYPE,
  noumSidePanelId,
  ...sideModalProps
}: SidePanelProps) => {
  const { activeEditingTool } = useEditChamberState();
  const { width } = useWindowDimensions();
  const isDesktop = useMemo(() => width >= breakpoints.TABLET_L, [width]);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, true, onClose, {
    excludes: [
      `.modal-root [data-testid="genius-completion-modal"]`,
      `.modal-root [data-testid="dropdown-container"]`,
      '.NoumEditor-root [data-testid="hoverWrapper-container"]',
      `.modal-root [data-testid="nonremovable-tools-modal"]`,
    ],
  });

  const isTool = noumSidePanelType === SectionToolType.TOOL_TYPE;

  const isOpen =
    open &&
    (isTool
      ? !!activeEditingTool &&
        noumSidePanelId === activeEditingTool._id &&
        (ElementUtils.isMediaElement(activeEditingTool)
          ? ElementUtils.isImageAndVideoNotEmpty(activeEditingTool)
          : true)
      : true);

  const sidePanelTitle = useMemo(
    () =>
      isTool
        ? activeEditingTool?.elementType
          ? elementTitle[activeEditingTool.elementType as ElementTypeEnum]
          : t('noumena.noum_editor.tool')
        : t('noumena.noum_editor.edit_Section'),
    [activeEditingTool?.elementType, isTool],
  );

  return (
    <NoumSidePanelWrapper ref={containerRef} aria-label="side_panel_wrapper">
      <SideModal
        className="noums_container"
        placement="right"
        enableAnimation
        nonBlockingModal={isDesktop}
        disableEscapeKeyDown
        isBackgroundOpacity={!isDesktop}
        height="100%"
        padding={0}
        width="250px"
        title={sidePanelTitle}
        titleFont="body-m-bold"
        open={isOpen}
        onClose={onClose}
        rightSecondaryIcon={
          <Icon
            name="close_m"
            color="--icon-card-neutral-default"
            size={24}
            onClick={onClose}
          />
        }
        {...sideModalProps}
      >
        {isTool ? (
          <EditTool noumSidePanelId={noumSidePanelId} />
        ) : (
          <NoumEditSection noumSidePanelId={noumSidePanelId} />
        )}
      </SideModal>
    </NoumSidePanelWrapper>
  );
};
