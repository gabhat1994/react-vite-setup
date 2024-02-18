import { type FC, memo } from 'react';
import {
  Draggable,
  type DraggableProvided,
  type DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { DragableSection } from './DragableSection';
import { type DragableAreaProps } from './types';

export const DragableSectionArea: FC<DragableAreaProps> = memo((props) => {
  const { index, section } = props;

  return (
    <Draggable
      draggableId={`${section?._id}`}
      index={index}
      disableInteractiveElementBlocking
    >
      {(
        dragProvided: DraggableProvided,
        dragSnapshot: DraggableStateSnapshot,
      ) => (
        <DragableSection
          {...props}
          isDragging={dragSnapshot.isDragging}
          provided={dragProvided}
          index={index}
        />
      )}
    </Draggable>
  );
});
