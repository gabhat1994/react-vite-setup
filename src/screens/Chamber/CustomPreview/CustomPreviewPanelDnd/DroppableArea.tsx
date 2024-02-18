import { type FC } from 'react';
import {
  Droppable,
  type DroppableProvided,
  type DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { ElementUtils } from '@/utils/element';
import { useTranslation } from 'react-i18next';
import { DragableArea } from './DragableArea';
import { DropZone } from './styles';
import { type DroppableAreaProps } from './types';
import { getVisiblityChangeButtonTooltip } from '../customPreviewHelper';

export const DroppableArea: FC<DroppableAreaProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Droppable droppableId="custom_preview_panel_list">
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
      ) => (
        <DropZone
          ref={dropProvided.innerRef}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
          data-testid="custom-preview-panel-wrapper"
        >
          {props.elements.map((element, index) =>
            ElementUtils.isCustomPreviewEditable(element) ? (
              <DragableArea
                {...props}
                key={element._id}
                index={index}
                currentIndex={index}
                totalIndex={props.elements.length - 1}
                element={element}
                visiblityChangeButtonData={{
                  isEnabled: ElementUtils.isCPVisibilityChangeable(element),
                  tooltipMessage:
                    getVisiblityChangeButtonTooltip(element) ||
                    (ElementUtils.isCustomPreviewVisible(element)
                      ? t(
                          'noumena.noum_edit.custom_preview.button.hide.tooltip',
                        )
                      : t(
                          'noumena.noum_edit.custom_preview.button.show.tooltip',
                        )),
                }}
              />
            ) : null,
          )}
          {dropProvided.placeholder}
        </DropZone>
      )}
    </Droppable>
  );
};
