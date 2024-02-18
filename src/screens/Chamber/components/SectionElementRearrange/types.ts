import { type Dispatch, type SetStateAction } from 'react';
import {
  type DraggableProvided,
  type SnapDragActions,
} from 'react-beautiful-dnd';
import {
  type ElementOutput,
  type NoumLayoutColumn,
  type NoumLayoutSection,
} from '@/apollo/generated/types';

export type SectionToolProps = 'SectionType' | 'ToolType';

export type PlaceholderProps = {
  dragX: number;
  dragY: number;
  dragHeight: number;
  dragWidth: number;
  dropWidth: number;
  dropHeight: number;
};

export type RearrageProps = {
  setNoumSidePanelId?: (value: SetStateAction<string | undefined>) => void;
  noumSidePanelId?: string | undefined;
  setNoumSidePanelType?: (value: SectionToolProps) => void;
  sections?: NoumLayoutSection[];
  setSections: Dispatch<SetStateAction<NoumLayoutSection[] | undefined>>;
  placeholderProps?: PlaceholderProps;
  isElementDragging?: boolean;
};

export type DroppableAreaProps = Omit<RearrageProps, 'setSections'> & {
  spaceId?: string;
  lift?: (quoteId: string) => SnapDragActions | null;
  isHomeNoum?: boolean;
  tools?: ElementOutput[];
  columnId?: string;
  col?: NoumLayoutColumn;
  isSectionLayout?: boolean;
  isSectionBg?: boolean;
  setOnDragInitiateId?: (value: string) => void;
  onDragInitiateId?: string;
  sectionId?: string;
};

export type DragableAreaProps = Omit<
  DroppableAreaProps,
  'sections' | 'tools'
> & {
  section?: NoumLayoutSection;
  tool?: ElementOutput;
  index: number;
  currentIndex?: number;
  totalIndex?: number;
  lastItem?: boolean;
};

export type DragableSectionProps = DragableAreaProps & {
  isDragging?: boolean;
  provided?: DraggableProvided;
};

export type GetSection = {
  section: NoumLayoutSection | undefined;
  sectionIndex: number;
};

export type GetColumn = {
  column: NoumLayoutSection['columns'][0] | undefined;
  columnIndex: number;
};

export type GetToolElement = {
  sectionIndex: number;
  columnIndex: number;
  elementIndex: number;
  element: ElementOutput | undefined;
};

export enum DropabbleType {
  DROPPABLE_SECTION = 'droppableSection',
  DROPPABLE_ELEMENT = 'droppableElement',
}
