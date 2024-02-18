import { type FC, useMemo, useRef } from 'react';
import {
  Droppable,
  type DroppableProvided,
  type DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { ElementUtils } from '@/utils/element';
import { Spinner } from '@/components/Spinner';
import { SpaceUtils } from '@/utils/space';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { type ElementTypeEnum } from '@/apollo/generated/types';
import { NoumContentElement } from '../NoumContentElement';
import { DragableElementArea } from './DragableElementArea';
import {
  DroppableElement,
  DropZoneColumn,
  EditColumnContainer,
} from './styles';
import { DropabbleType, type DroppableAreaProps } from './types';
import { useEditChamberState } from '../../EditChamber/provider';

export const DroppableElementArea: FC<DroppableAreaProps> = (props) => {
  const {
    tools,
    columnId,
    placeholderProps,
    col,
    isSectionLayout,
    onDragInitiateId,
    setOnDragInitiateId,
  } = props;
  const { hasElementPermissionEnabled } = useNoumAuthorization();
  const { sectionSideBarOptions, layoutLoading, space } = useEditChamberState();
  const columnRef = useRef<HTMLDivElement>(null);

  const renderableTools = useMemo(
    () =>
      tools
        ? ElementUtils.filterMasterElement(
            tools,
            SpaceUtils.isMasterNoum(space),
          )
            .filter((element) =>
              hasElementPermissionEnabled(
                element.elementType as ElementTypeEnum,
                true,
              ),
            )
            .sort(ElementUtils.sortUnpublished)
        : [],
    [hasElementPermissionEnabled, space, tools],
  );

  const isSelectedColumn =
    col?._id === sectionSideBarOptions?.columnBackground?.id;
  const isToolInColumn = renderableTools.some(
    (tool) => tool._id === onDragInitiateId,
  );
  const columnHeight = isToolInColumn
    ? columnRef.current?.clientHeight
    : undefined;
  if (layoutLoading && isSectionLayout) return <Spinner />;
  return (
    <Droppable droppableId={columnId!} type={DropabbleType.DROPPABLE_ELEMENT}>
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
      ) => (
        <DropZoneColumn
          id={columnId}
          ref={dropProvided.innerRef}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
          data-testid="column"
          isBackground={
            isSelectedColumn
              ? sectionSideBarOptions?.columnBackground?.background
              : col?.background
          }
        >
          <EditColumnContainer ref={columnRef} height={columnHeight}>
            {renderableTools.length > 0
              ? renderableTools.map((element, index, arr) => (
                  <DragableElementArea
                    {...props}
                    key={element._id}
                    index={index}
                    currentIndex={index}
                    totalIndex={renderableTools.length - 1}
                    tool={element}
                    lastItem={arr.length - 1 === index}
                    placeholderProps={placeholderProps}
                    setOnDragInitiateId={setOnDragInitiateId}
                    onDragInitiateId={onDragInitiateId}
                  />
                ))
              : !dropSnapshot.isDraggingOver && (
                  <NoumContentElement {...props} />
                )}
          </EditColumnContainer>

          {dropSnapshot.isDraggingOver && (
            <DroppableElement placeholderProps={placeholderProps} />
          )}
          {dropProvided.placeholder}
        </DropZoneColumn>
      )}
    </Droppable>
  );
};
