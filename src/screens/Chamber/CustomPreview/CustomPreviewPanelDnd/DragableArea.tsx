import { type FC, memo } from 'react';
import {
  Draggable,
  type DraggableProvided,
  type DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { DragableElement } from './DragableElement';
import { type DragableAreaProps } from './types';

export const DragableArea: FC<DragableAreaProps> = memo((props) => (
  <Draggable
    draggableId={`${props.element._id}`}
    index={props.index}
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
      />
    )}
  </Draggable>
));
