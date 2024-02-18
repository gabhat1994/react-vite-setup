import { type HTMLAttributes } from 'react';
import {
  type DraggableProvided,
  type SnapDragActions,
} from 'react-beautiful-dnd';
import {
  type ElementOutput,
  type ElementTypeEnum,
} from '@/apollo/generated/types';
import { type TextAlignType } from '../NoumSections/constants';

export interface IWrapper {
  /** Id of the space */
  spaceId: string;
  /** Type of space */
  spaceType?: string;
  /** whether owner or guest */
  isOwner?: boolean;
  /** Id of the element */
  element: ElementOutput;
  /** current index of the element */
  currentIndex?: number;
  /** total index of the element */
  totalIndex?: number;
  /** Title of the element */
  currentTitle?: string;
  /** use to disable order up button */
  isEditing?: boolean;
  /** use to disable order down button */
  children?: JSX.Element;
  /** handler to click up button */
  onUpClick?: () => void;
  /** handler to click down button */
  onDownClick?: () => void;
  /** dnd props */
  provided?: DraggableProvided;
  /** dnd props */
  lift?: (quoteId: string) => SnapDragActions | null;
  /** use to disable order up button */
  isSpecialCollapsing?: boolean;
  /** definition that container should have border */
  isBorder?: boolean;
  /** Optional for HomeChambers */
  handleOpenExperienceModal?: (arg: ElementTypeEnum) => void;
  /** Is content hidden */
  hideContent?: boolean;
  /** Set show all function */
  setShowAll?: (value: boolean) => void;
  /** use to disable deletion button */
  isCustomPreview?: boolean;
  /** Is custom preview hidden */
  isCustomPreviewVisible?: boolean;
  /** use to change visibility of custom preview */
  handleCPVisibilityChange?: (isVisible: boolean) => void;
  /** use to change view of custom preview */
  selectedCustomPreviewTab?: string;
  /** is updated lately */
  isHighlight?: boolean;
  /**  use to show title in multiple lines without ellipse */
  showFullTitle?: boolean;
  columnWidth?: number;
  isActiveTool?: boolean;
  updateElementLoader?: boolean;
}

type ViewProp = {
  showCollapseBtn?: boolean;
  rightPadding?: number;
};

export type WrapperViewProp = ElementWrapperProps &
  ViewProp & {
    fullWidth?: boolean;
  };

export type ElementWrapperProps = HTMLAttributes<HTMLDivElement> & IWrapper;

export type NoumLayoutToolMetaValues = {
  align?: TextAlignType;
  percentageSize?: number;
};

export type NoumLayoutToolWrapperProps = {
  meta?: NoumLayoutToolMetaValues;
  children: JSX.Element;
};

export type NoumEditorViewProp = {
  currentTitle?: string;
  children?: React.ReactNode;
};
