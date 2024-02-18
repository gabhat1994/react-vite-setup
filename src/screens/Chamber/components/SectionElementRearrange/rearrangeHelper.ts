import { type DropResult } from 'react-beautiful-dnd';
import {
  type ElementOutput,
  type NoumLayoutColumn,
  type NoumLayoutSection,
  SpaceTypeEnum,
} from '@/apollo/generated/types';
import { ElementUtils } from '@/utils/element';
import {
  type GetColumn,
  type GetSection,
  type GetToolElement,
  type PlaceholderProps,
} from './types';

const queryAttrDrag = 'data-rbd-drag-handle-draggable-id';
const queryAttrDrop = 'data-rbd-droppable-id';

export const getSection = (colId: string, data: NoumLayoutSection[]) => {
  let newSection: GetSection = {
    section: undefined,
    sectionIndex: 0,
  };
  data.forEach((section, sectionIndex) => {
    if (section.columns.find((col) => col._id === colId)) {
      newSection = { section, sectionIndex };
    }
  });
  return newSection;
};

export const getColumn = (colId: string, data?: NoumLayoutColumn[]) => {
  let newColumn: GetColumn = {
    column: undefined,
    columnIndex: 0,
  };
  data?.forEach((column, columnIndex) => {
    if (column._id === colId) {
      newColumn = { column, columnIndex };
    }
  });
  return newColumn;
};

export const getToolElement = (
  elementId: string,
  sections?: NoumLayoutSection[],
) => {
  let newElement: GetToolElement = {
    sectionIndex: 0,
    columnIndex: 0,
    elementIndex: 0,
    element: undefined,
  };

  sections?.forEach((section, sectionIndex) => {
    section?.columns.forEach((column, columnIndex) => {
      column.tools.forEach((tool, elementIndex) => {
        if (tool._id === elementId) {
          newElement = {
            sectionIndex,
            columnIndex,
            elementIndex,
            element: tool,
          };
        }
      });
    });
  });

  return newElement;
};

export const getFilterTools = (tools: ElementOutput[], spaceType: string) =>
  ElementUtils.filterMasterElement(tools, spaceType === SpaceTypeEnum.Home);

const getDraggedDom = (draggableId: string, queryDragAttr: string) => {
  const domQuery = `[${queryDragAttr}='${draggableId}']`;
  const draggedDOM = document.querySelector<HTMLElement>(domQuery)?.parentNode
    ?.parentNode?.parentNode as Element;

  return draggedDOM;
};

const getDropDom = (dropableId: string, queryDropAttr: string) => {
  const domQuery = `[${queryDropAttr}='${dropableId}']`;
  const draggedDOM = document.querySelector<HTMLElement>(domQuery);
  return draggedDOM;
};

export const placeHolderHandlerUpdate = (update: DropResult) => {
  let placeHolderValue: PlaceholderProps = {
    dragX: 0,
    dragY: 0,
    dragHeight: 0,
    dragWidth: 0,
    dropWidth: 0,
    dropHeight: 0,
  };

  if (update.destination) {
    const { draggableId } = update;
    const destinationIndex = update.destination.index;
    const sourceIndex = update.source.index;
    const sourceDropableId = update.source.droppableId;
    const destDropableId = update.destination.droppableId;
    const draggedDOM = getDraggedDom(draggableId, queryAttrDrag);
    const dropDom = getDropDom(update.destination.droppableId, queryAttrDrop);
    const draggedStackDom = draggedDOM.parentNode as Element;
    const DropDomChild = dropDom?.children[0];
    if (!draggedDOM || !draggedStackDom || !DropDomChild) {
      return {
        dragX: 0,
        dragY: 0,
        dragHeight: 0,
        dragWidth: 0,
        dropWidth: 0,
        dropHeight: 0,
      };
    }
    const { clientWidth: dropWidth, clientHeight: dropHeight } = dropDom;
    const { clientHeight, clientWidth } = draggedDOM;
    const childrenArray = [...draggedStackDom.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const singleColumnArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    const MultiColumnDrop = [...DropDomChild.children];
    const updatedMultiColumnDrop = [...MultiColumnDrop, movedItem];

    const placeHolderArray =
      sourceDropableId === destDropableId
        ? singleColumnArray
        : updatedMultiColumnDrop;

    const clientY =
      parseFloat(window.getComputedStyle(draggedStackDom).paddingTop) +
      placeHolderArray
        .slice(0, destinationIndex)
        .reduce((total, curr) => total + curr.clientHeight + 12, 0);

    placeHolderValue = {
      dragX: parseFloat(window.getComputedStyle(draggedStackDom).paddingLeft),
      dragY: clientY,
      dragHeight: clientHeight,
      dragWidth: clientWidth,
      dropHeight,
      dropWidth,
    };
  }

  return placeHolderValue;
};

export const placeHolderHandlerStart = (event: DropResult) => {
  let placeHolderStartValue: PlaceholderProps = {
    dragX: 0,
    dragY: 0,
    dragHeight: 0,
    dragWidth: 0,
    dropWidth: 0,
    dropHeight: 0,
  };

  const draggedDOM = getDraggedDom(event.draggableId, queryAttrDrag)
    .parentNode as Element;

  const draggedStackDom = draggedDOM.parentNode as Element;
  if (!draggedDOM || !draggedStackDom) {
    return {
      dragX: 0,
      dragY: 0,
      dragHeight: 0,
      dragWidth: 0,
      dropWidth: 0,
      dropHeight: 0,
    };
  }
  const { clientHeight, clientWidth } = draggedDOM;
  const sourceIndex = event.source.index;
  if (draggedDOM?.parentNode) {
    const clientY =
      parseFloat(window.getComputedStyle(draggedStackDom).paddingTop) +
      [...draggedStackDom.children]
        .slice(0, sourceIndex)
        .reduce((total, curr) => total + curr.clientHeight + 12, 0);

    placeHolderStartValue = {
      dragHeight: clientHeight,
      dragWidth: clientWidth,
      dragX: clientY,
      dragY: parseFloat(window.getComputedStyle(draggedStackDom).paddingLeft),
      dropHeight: 0,
      dropWidth: 0,
    };
  }

  return placeHolderStartValue;
};

export const getColumnId = (
  elementId: string,
  sections?: NoumLayoutSection[],
) => {
  let columnId: string | undefined;
  sections?.forEach((section) => {
    section?.columns.forEach((column) => {
      column.tools.forEach((tool) => {
        if (tool._id === elementId) {
          columnId = column._id;
        }
      });
    });
  });
  return columnId;
};

export const repositionSections = (
  sections: NoumLayoutSection[],
  newItemPosition: number,
  increment: boolean = true,
) =>
  sections.map((section) =>
    section.position >= newItemPosition
      ? {
          ...section,
          position: increment ? section.position + 1 : section.position - 1,
        }
      : section,
  );

export const repositionTools = (
  tools: ElementOutput[],
  newItemPosition: number,
  baseToolId: string,
) =>
  tools.map((toolItem) => {
    if (!toolItem.position) return toolItem;
    return toolItem.position >= newItemPosition && baseToolId !== toolItem._id
      ? { ...toolItem, position: toolItem.position + 1 }
      : toolItem;
  });

export const getSrcDestSections = (
  sections: NoumLayoutSection[],
  srcDropableId: string,
  destDropableId: string,
) => {
  const { section: sourceSection, sectionIndex } = getSection(
    srcDropableId,
    sections,
  );
  const { column: sourceColumn, columnIndex } = getColumn(
    srcDropableId,
    sourceSection?.columns,
  );

  const { section: destSection, sectionIndex: destSectionIndex } = getSection(
    destDropableId,
    sections,
  );
  const { column: destColumn, columnIndex: destColumnIndex } = getColumn(
    destDropableId,
    destSection?.columns,
  );

  return {
    sourceSection,
    sourceColumn,
    sectionIndex,
    columnIndex,
    destSection,
    destColumn,
    destSectionIndex,
    destColumnIndex,
  };
};
