import {
  type DraggableProvided,
  type SnapDragActions,
} from 'react-beautiful-dnd';
import { type SectionToolProps } from '@/screens/Chamber/components/SectionElementRearrange/types';
import {
  type ElementOutput,
  type NoumLayoutSection,
} from '@/apollo/generated/types';

export enum InsertDirection {
  Above = 'Above',
  Below = 'Below',
}

export type SectionProps = {
  children: JSX.Element | JSX.Element[];
  className: string;
  type: SectionToolProps;
  isActive: boolean;
  id: string;
  lift?: (quoteId: string) => SnapDragActions | null;
  currentIndex?: number;
  totalIndex?: number;
  section?: NoumLayoutSection;
  tool?: ElementOutput;
  provided?: DraggableProvided;
  isDragging?: boolean;
  isElementDragging?: boolean;
  onInsert?: (direction: InsertDirection) => void;
  onUpClick?: () => Promise<void>;
  onDownClick?: () => Promise<void>;
  isSectionBackground?: boolean;
  isColumnBackground?: boolean;
  setOnDragInitiateId?: (moveId: string) => void;
  isTool?: boolean;
  elementType?: string;
  disabled?: {
    duplicate?: boolean;
    delete?: boolean;
    edit?: boolean;
    moveUp?: boolean;
    moveDown?: boolean;
    visibility?: boolean;
  };
  isCustomPreview?: boolean;
  isEditing?: boolean;
};

export type ControlPanelProps = {
  isTool?: boolean;
  id?: string;
  onUpClick?: () => void;
  onDownClick?: () => void;
  provided?: DraggableProvided;
  currentIndex?: number;
  totalIndex?: number;
  section?: NoumLayoutSection | undefined;
  tool?: ElementOutput;
  isDisabled?: boolean;
  setOnDragInitiateId?: (moveId: string) => void;
  isSectionBackground?: boolean;
  toolTip?: string;
};

export enum ToolbuttonEdge {
  bothTop = 'bothTop',
  bothBottom = 'bothBottom',
  topLeft = 'topLeft',
  topRight = 'topRight',
}

export type PlusButtonProps = {
  onClick?: () => void;
};

type ControlType = 'delete' | 'duplicate' | 'edit';

export type HasElementHoverControlPermissionProps = {
  element?: ElementOutput;
  controlType?: ControlType;
  fallbackValue?: boolean;
};
