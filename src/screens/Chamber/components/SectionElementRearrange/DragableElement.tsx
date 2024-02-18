import { t } from 'i18next';
import {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Stack } from '@/layout';

import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Element } from '@/screens/Chamber/components/Element';
import { ElementUtils } from '@/utils/element';
import { ElementTypeEnum } from '@/apollo/generated/types';
import { useWindowMouseMove } from '@/hooks/useWindowMoueMove';
import {
  AddToolPopover,
  HoverWrapper,
  InsertDirection,
} from '@/features/noums/noumEditor/components';
import { SectionToolType } from '@/features/noums/noumEditor/shared/constants';
import { NonInteractiveOverlay } from '@/screens/Chamber/components/ElementWrapper/styles';
import { useHoverControlPermission } from '@/features/noums/noumEditor/components/HoverWrapper/useHoverControlPermission';
import { type HasElementHoverControlPermissionProps } from '@/features/noums/noumEditor/components/HoverWrapper/types';
import { useEditChamberState } from '../../EditChamber/provider';

import { DNDElementContainer, DraggingElement, ElementWrapper } from './styles';
import { type DragableSectionProps } from './types';

export const DragableElement = memo((props: DragableSectionProps) => {
  const {
    tool,
    provided,
    noumSidePanelId,
    isDragging,
    spaceId,
    columnId,
    isSectionBg,
    col,
    setOnDragInitiateId,
    onDragInitiateId,
    index,
  } = props;
  const elementRef = useRef<HTMLDivElement>(null);
  const [columnWidth, setColumnWidth] = useState<number | undefined>(undefined);
  const handleMouseUp = () => {
    setOnDragInitiateId?.('');
  };
  const { coords } = useWindowMouseMove(handleMouseUp);
  const [insertDirection, setInsertDirection] = useState<
    InsertDirection | undefined
  >(undefined);
  const { handleEditModal, sectionSideBarOptions, isOwner } =
    useEditChamberState();
  const isDraggingToolPressed = useMemo(
    () => onDragInitiateId === tool?._id,
    [onDragInitiateId, tool?._id],
  );
  const isActiveTool = noumSidePanelId === tool?._id!;
  const isColumn = col?._id === sectionSideBarOptions?.columnBackground?.id;
  const insertPosition = useMemo(() => {
    if (!tool) return 1;
    const elementPosition = ElementUtils.getPosition(tool);
    return insertDirection === InsertDirection.Above
      ? elementPosition - 0.5
      : elementPosition + 0.5;
  }, [insertDirection, tool]);
  const handleInsert = useCallback((direction: InsertDirection) => {
    setInsertDirection(direction);
  }, []);
  const elementHandler = useCallback(
    (e) => {
      e.stopPropagation();
      handleEditModal?.(SectionToolType.TOOL_TYPE, tool?._id!, tool);
    },
    [handleEditModal, tool],
  );

  const isBackgroundcontent = useMemo(
    () =>
      tool?.elementType === ElementTypeEnum.Video ||
      tool?.elementType === ElementTypeEnum.Text ||
      tool?.elementType === ElementTypeEnum.Image ||
      tool?.elementType === ElementTypeEnum.BusinessBrief,
    [tool?.elementType],
  );

  const isNonInteractive = useMemo(
    () =>
      tool?.elementType === ElementTypeEnum.Userposts ||
      tool?.elementType === ElementTypeEnum.Calendar ||
      tool?.elementType === ElementTypeEnum.Wallet ||
      tool?.elementType === ElementTypeEnum.Message ||
      tool?.elementType === ElementTypeEnum.QuickQuestions ||
      tool?.elementType === ElementTypeEnum.FilesManager ||
      tool?.elementType === ElementTypeEnum.ContractManager,
    [tool?.elementType],
  );

  const isSkillOrNetwork = useMemo(
    () =>
      tool?.elementType === ElementTypeEnum.Skills ||
      tool?.elementType === ElementTypeEnum.Usernetwork,
    [tool?.elementType],
  );

  const { hasElementHoverControlPermission } = useHoverControlPermission();

  const hoverButtonsDisabled = useMemo(() => {
    const hasElementHoverControlArgs: HasElementHoverControlPermissionProps = {
      element: tool,
      fallbackValue: isOwner,
    };
    return {
      duplicate:
        tool &&
        (!ElementUtils.isAvailableToDuplicate(tool) ||
          !hasElementHoverControlPermission(hasElementHoverControlArgs)),
      edit:
        tool &&
        ((ElementUtils.isMediaElement(tool) &&
          !ElementUtils.isImageAndVideoNotEmpty(tool)) ||
          !hasElementHoverControlPermission(hasElementHoverControlArgs)),
      delete:
        tool &&
        (ElementUtils.isNotAvailableToDelete(tool) ||
          !hasElementHoverControlPermission(hasElementHoverControlArgs)),
    };
  }, [hasElementHoverControlPermission, isOwner, tool]);

  useLayoutEffect(() => {
    setColumnWidth(elementRef.current?.clientWidth);
  }, []);

  return (
    <DNDElementContainer
      aria-label={`tool_${index + 1}`}
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.draggableProps.style}
      data-testid={tool?._id}
      insertDirection={insertDirection}
      style={{
        ...provided?.draggableProps.style,
        width: isDraggingToolPressed ? `303px` : 'auto',
        left: isDraggingToolPressed
          ? `${coords.x - (isBackgroundcontent ? 170 : 200)}px`
          : '',
        top: isDraggingToolPressed ? `${coords.y}px` : '',
        marginLeft: isDraggingToolPressed ? 'auto' : '',
        height: isDraggingToolPressed ? `40px` : `auto`,
        zIndex: isDraggingToolPressed ? '5000' : 'auto',
      }}
    >
      {insertDirection && (
        <AddToolPopover
          spaceId={spaceId}
          columnId={columnId || ''}
          isOpen={!!insertDirection}
          onClose={() => setInsertDirection(undefined)}
          position={insertPosition}
          baseElementId={tool?._id || undefined}
        />
      )}
      <HoverWrapper
        key={tool?._id}
        id={tool?._id!}
        className="child"
        type={SectionToolType.TOOL_TYPE}
        isActive={isActiveTool}
        isDragging={isDragging}
        onInsert={handleInsert}
        isSectionBackground={isBackgroundcontent && isSectionBg}
        setOnDragInitiateId={setOnDragInitiateId}
        isTool={isDraggingToolPressed}
        elementType={tool?.elementType!}
        isColumnBackground={
          isBackgroundcontent && isColumn
            ? sectionSideBarOptions?.columnBackground?.background
            : col?.background
        }
        disabled={hoverButtonsDisabled}
        {...props}
      >
        {isDragging || isDraggingToolPressed ? (
          <DraggingElement>
            <Stack gap={22} align="center">
              <Icon name="post_m" size={24} />
              <TSpan font="footnote" colorToken=" --text-card-neutral-default">
                {t('noumena.noum_editor.drag_item')}
              </TSpan>
            </Stack>
          </DraggingElement>
        ) : (
          <ElementWrapper
            ref={elementRef}
            onClick={(e) => elementHandler(e)}
            className="element-container"
            isDragging={isDragging}
            isBackground={isBackgroundcontent}
            isSkillOrNetwork={isSkillOrNetwork}
          >
            {isNonInteractive && <NonInteractiveOverlay />}
            <Element
              className="element-container"
              spaceId={spaceId!}
              element={tool!}
              id={`${tool?._id}`}
              currentTitle={
                tool?.headerContent ?? tool?.elementType ?? 'UNKNOWN'
              }
              isEditing={true}
              columnWidth={columnWidth}
              isActiveTool={isActiveTool}
              textEditorContentPadding={16}
            />
          </ElementWrapper>
        )}
      </HoverWrapper>
    </DNDElementContainer>
  );
});
