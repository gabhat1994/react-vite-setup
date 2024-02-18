import {
  SpaceTypeEnum,
  type ElementOutput,
  type MoveToolToNoumLayoutColumnInput,
  type NoumLayoutSection,
  type RearrangeSectionInNoumLayoutInput,
} from '@/apollo/generated/types';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { reorderList } from '@/utils/list';
import _ from 'lodash';
import { useCallback, useRef, useState, type FC } from 'react';
import {
  DragDropContext,
  type DropResult,
  type PreDragActions,
  type SensorAPI,
  type SnapDragActions,
} from 'react-beautiful-dnd';
import {
  useMoveToolToNoumLayoutColumnHelper,
  useSectionPositionHelper,
} from '@/features/noums/hooks/spaceQuery';
import { SectionToolType } from '@/features/noums/noumEditor/shared/constants';
import { DroppableSectionArea } from './DroppableSectionArea';
import {
  getFilterTools,
  getSrcDestSections,
  placeHolderHandlerStart,
  placeHolderHandlerUpdate,
} from './rearrangeHelper';
import {
  DropabbleType,
  type PlaceholderProps,
  type RearrageProps,
} from './types';

export const Rearrage: FC<RearrageProps> = (props) => {
  const { space, handleEditModal, setHeight } = useEditChamberState();
  const { setSections, sections } = props;
  const sensorAPIRef = useRef<SensorAPI | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [onDragInitiateId, setOnDragInitiateId] = useState('');
  const [placeholderProps, setPlaceholderProps] = useState<
    PlaceholderProps | undefined
  >();
  const useSensor = (api: SensorAPI) => {
    sensorAPIRef.current = api;
  };

  const { moveToolToNoumLayoutColumnHelper } =
    useMoveToolToNoumLayoutColumnHelper();
  const { updateSectionPositionHelper } = useSectionPositionHelper();

  const lift = useCallback(
    (draggableId: string): SnapDragActions | null => {
      if (isDragging) {
        return null;
      }
      const api = sensorAPIRef.current;
      if (!api) {
        return null;
      }
      const preDrag: PreDragActions | null = api.tryGetLock(
        draggableId,
        () => {},
      );

      if (!preDrag) {
        return null;
      }
      return preDrag.snapLift();
    },
    [isDragging],
  );

  const onDragStart = useCallback((event: DropResult) => {
    setIsDragging(true);
    if (event.type === DropabbleType.DROPPABLE_ELEMENT) {
      const placeholderStartValue = placeHolderHandlerStart(event);
      setPlaceholderProps({
        dragX: placeholderStartValue.dragX,
        dragY: placeholderStartValue.dragY,
        dragHeight: placeholderStartValue.dragHeight,
        dragWidth: placeholderStartValue.dragWidth,
        dropWidth: placeholderStartValue.dropWidth,
        dropHeight: placeholderStartValue.dropHeight,
      });
    }
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!space?._id) return;

      setIsDragging(false);
      setOnDragInitiateId('');
      const { source, destination } = result;
      if (!destination) {
        return;
      }
      const sourceElementIndex = source.index;
      const destElementIndex = destination?.index;
      const sectionBackUp = _.cloneDeep(sections) || [];
      if (result.type === DropabbleType.DROPPABLE_SECTION) {
        const rearrageSectionInput: RearrangeSectionInNoumLayoutInput = {
          sectionId: result.draggableId,
          position: destElementIndex + 1,
        };
        const newSections = reorderList<NoumLayoutSection>(
          sectionBackUp,
          sourceElementIndex,
          destElementIndex,
        );
        setSections(newSections);
        updateSectionPositionHelper(
          rearrageSectionInput,
          space._id,
          sourceElementIndex,
          destElementIndex,
        );
      } else if (result.type === DropabbleType.DROPPABLE_ELEMENT) {
        const {
          sourceSection,
          columnIndex,
          destColumn,
          sectionIndex,
          destSection,
          sourceColumn,
          destColumnIndex,
          destSectionIndex,
        } = getSrcDestSections(
          sectionBackUp,
          source.droppableId,
          destination.droppableId,
        );

        const sourcefiltertools = getFilterTools(
          sourceColumn?.tools!,
          space?.type!,
        );
        const moveToolToNoumLayoutColumnInput: MoveToolToNoumLayoutColumnInput =
          {
            columnId: destination.droppableId,
            toolId: sourceColumn?.tools[source.index]._id || '',
            position: 1,
          };

        if (source.droppableId === destination.droppableId) {
          moveToolToNoumLayoutColumnInput.position = destElementIndex + 1;
          if (sourceColumn && sourceSection) {
            const reOrderElements = reorderList<ElementOutput>(
              sourcefiltertools,
              sourceElementIndex,
              destElementIndex!,
            );
            const updatedElements = {
              ...sourceColumn,
              tools: reOrderElements,
            };
            const updatedColumns = sourceSection?.columns || [];
            updatedColumns.splice(columnIndex, 1, updatedElements);
            const updatedSections = {
              ...sourceSection,
              columns: updatedColumns,
            };
            sectionBackUp.splice(sectionIndex, 1, updatedSections);
            setSections(sectionBackUp);
          }
        } else {
          const preDestToolPosition =
            destColumn?.tools[destination.index - 1]?.position || 0;
          moveToolToNoumLayoutColumnInput.position = preDestToolPosition + 1;
          if (sourceColumn && destColumn && sourceSection && destSection) {
            const [element] = sourceColumn.tools.splice(sourceElementIndex, 1);
            destColumn.tools.splice(destination.index, 0, element);
            const updatedDestColumns = destSection?.columns || [];
            updatedDestColumns[destColumnIndex] = destColumn;
            const updatedDestSections = {
              ...destSection,
              columns: updatedDestColumns,
            };
            sectionBackUp[destSectionIndex] = updatedDestSections;
            setSections(sectionBackUp);
          }
        }
        if (moveToolToNoumLayoutColumnInput.toolId !== '' && space?._id)
          moveToolToNoumLayoutColumnHelper(
            moveToolToNoumLayoutColumnInput,
            space._id,
            source,
            destination,
          );
        handleEditModal?.(
          SectionToolType.TOOL_TYPE,
          result.draggableId,
          destColumn?.tools.find((item) => item._id === result.draggableId),
        );
        setHeight?.(undefined);
      }
    },
    [
      handleEditModal,
      moveToolToNoumLayoutColumnHelper,
      sections,
      setHeight,
      setSections,
      space?._id,
      space?.type,
      updateSectionPositionHelper,
    ],
  );

  const onDragUpdate = (update: DropResult) => {
    if (update.type === DropabbleType.DROPPABLE_ELEMENT) {
      const placeHolderVal = placeHolderHandlerUpdate(update);
      if (!placeHolderVal) return;
      setPlaceholderProps({
        dragX: placeHolderVal.dragX,
        dragY: placeHolderVal.dragY,
        dragHeight: placeHolderVal.dragHeight,
        dragWidth: placeHolderVal.dragWidth,
        dropWidth: placeHolderVal.dropWidth,
        dropHeight: placeHolderVal.dropHeight,
      });
    }
  };

  if (!space?._id) {
    return null;
  }

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={[useSensor]}
      onDragUpdate={onDragUpdate}
    >
      <DroppableSectionArea
        spaceId={space?._id}
        lift={lift}
        isHomeNoum={space?.type === SpaceTypeEnum.Home}
        placeholderProps={placeholderProps}
        isElementDragging={isDragging}
        onDragInitiateId={onDragInitiateId}
        setOnDragInitiateId={setOnDragInitiateId}
        {...props}
      />
    </DragDropContext>
  );
};

export default Rearrage;
