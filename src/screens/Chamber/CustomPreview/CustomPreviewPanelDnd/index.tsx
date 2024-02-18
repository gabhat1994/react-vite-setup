import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DragDropContext,
  type DropResult,
  type PreDragActions,
  type SensorAPI,
  type SnapDragActions,
} from 'react-beautiful-dnd';
import {
  type ElementOutput,
  type NoumCustomPreviewElementInput,
  SpaceTypeEnum,
} from '@/apollo/generated/types';
import { reorderList } from '@/utils/list';
import { ElementUtils } from '@/utils/element';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { DroppableArea } from './DroppableArea';
import { CustomPreviewTabEnum } from '../constants';

const CustomPreviewPanelDnd = () => {
  const {
    space,
    elements: originalEls,
    sendRerenderEvent,
    updateCustomPreviewElements,
    customPreviewElements,
    hasUnsavedCustomPreview,
  } = useEditChamberState();

  const sensorAPIRef = useRef<SensorAPI | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [elements, setElements] = useState<ElementOutput[]>([]);

  const useSensor = (api: SensorAPI) => {
    sensorAPIRef.current = api;
  };

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

  const onDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      setIsDragging(false);

      if (
        !space?._id ||
        !result.destination ||
        result.destination.index === result.source.index
      ) {
        return;
      }

      const newElements = reorderList<ElementOutput>(
        elements,
        result.source.index,
        result.destination.index,
      );
      if (updateCustomPreviewElements) {
        const elementsCP = newElements.map((el, index) => ({
          _id: el._id,
          customPosition: index + 1,
        })) as NoumCustomPreviewElementInput[];
        updateCustomPreviewElements(elementsCP);
      }
      setElements(newElements);
      sendRerenderEvent();
    },
    [space?._id, elements, sendRerenderEvent, updateCustomPreviewElements],
  );

  useEffect(() => {
    let updateElements;
    if (hasUnsavedCustomPreview) {
      updateElements = ElementUtils.unSavedfilterAndSortCPPublished(
        originalEls,
        customPreviewElements,
        CustomPreviewTabEnum.Edit,
      );
    } else {
      updateElements = ElementUtils.filterAndSortCPPublished(
        originalEls,
        CustomPreviewTabEnum.Edit,
      );
    }
    if (updateElements) {
      const newElements = ElementUtils.filterMasterElement(
        updateElements,
        space?.type === SpaceTypeEnum.Home,
      );
      setElements(newElements);
    }
  }, [
    customPreviewElements,
    hasUnsavedCustomPreview,
    originalEls,
    space?.type,
  ]);

  const handleCPVisibilityChange = useCallback(
    (elementId: string, isVisible: boolean) => {
      updateCustomPreviewElements?.([
        { _id: elementId, isCustomPreviewVisible: isVisible },
      ]);
    },
    [updateCustomPreviewElements],
  );

  if (!space?._id) {
    return null;
  }

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={[useSensor]}
    >
      <DroppableArea
        spaceId={space?._id}
        elements={elements}
        lift={lift}
        handleCPVisibilityChange={handleCPVisibilityChange}
      />
    </DragDropContext>
  );
};

export default CustomPreviewPanelDnd;
