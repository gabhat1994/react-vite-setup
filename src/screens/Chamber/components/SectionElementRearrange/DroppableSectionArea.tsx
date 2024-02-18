import { type FC } from 'react';
import {
  Droppable,
  type DroppableProvided,
  type DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { DragableSectionArea } from './DragableSectionArea';
import { DropZone } from './styles';
import { DropabbleType, type DroppableAreaProps } from './types';

export const DroppableSectionArea: FC<DroppableAreaProps> = (props) => {
  const { sections } = props;

  return (
    <Droppable
      droppableId="Section_edit_list"
      type={DropabbleType.DROPPABLE_SECTION}
    >
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
      ) => (
        <DropZone
          ref={dropProvided.innerRef}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
          data-testid="rearrange-wapper"
        >
          {sections?.map((section, index) => (
            <DragableSectionArea
              {...props}
              key={section._id}
              index={index}
              currentIndex={index}
              totalIndex={sections.length - 1}
              section={section}
            />
          ))}
          {dropProvided.placeholder}
        </DropZone>
      )}
    </Droppable>
  );
};
