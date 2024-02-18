import { type FC, memo } from 'react';
import {
  Draggable,
  type DraggableProvided,
  type DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { DragableElement } from './DragableElement';
import { type DragableAreaProps } from './types';

export const DragableElementArea: FC<DragableAreaProps> = memo((props) => {
  const { index, tool } = props;

  return (
    <Draggable
      draggableId={`${tool?._id}`}
      index={index}
      disableInteractiveElementBlocking
    >
      {(
        dragProvided: DraggableProvided,
        dragSnapshot: DraggableStateSnapshot,
      ) => (
        <DragableElement
          {...props}
          isDragging={dragSnapshot.isDragging}
          provided={dragProvided}
          index={index}
        />
      )}
    </Draggable>
  );
});
