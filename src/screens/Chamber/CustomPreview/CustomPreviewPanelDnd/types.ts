import {
  type DraggableProvided,
  type SnapDragActions,
} from 'react-beautiful-dnd';
import { type ElementOutput } from '@/apollo/generated/types';
import { type VisiblityChangeButtonDataProps } from '../types';

export type DroppableAreaProps = {
  spaceId: string;
  elements: ElementOutput[];
  lift?: (quoteId: string) => SnapDragActions | null;
  handleCPVisibilityChange?: (elementId: string, isVisible: boolean) => void;
};

export type DragableAreaProps = Omit<DroppableAreaProps, 'elements'> & {
  element: ElementOutput;
  index: number;
  currentIndex?: number;
  totalIndex?: number;
  visiblityChangeButtonData: VisiblityChangeButtonDataProps;
};

export type DragableElementProps = Omit<DragableAreaProps, 'index'> & {
  isDragging?: boolean;
  provided?: DraggableProvided;
};
