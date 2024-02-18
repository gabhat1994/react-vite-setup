import { type ReactNode } from 'react';
import { type FontType } from '@/components/Typography/Typography';

interface ChildrenRenderProps {
  onClose(): void;
}

export interface SideModalProps {
  children?: ((props: ChildrenRenderProps) => void) | ReactNode;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  enableAnimation?: boolean;
  onClose?: () => void;
  open: boolean;
  showCloseButton?: boolean;
  padding?: number;
  overflowX?: SideModalOverflow;
  overflowY?: SideModalOverflow;
  placement?: SideModalPlacement;
  title?: string;
  titleFont?: FontType;
  showScroll?: boolean;
  topOffset?: number;
  actionButton?: JSX.Element;
  titleFixed?: boolean;
  height?: string;
  isBackgroundOpacity?: boolean;
  nonBlockingModal?: boolean;
  rightSecondaryIcon?: JSX.Element;
  width?: string;
  mobileWidth?: string;
  className?: string;
  borderColor?: string;
}

export type SideModalPlacement = 'left' | 'right';
export type SideModalOverflow = 'auto' | 'scroll' | 'hidden' | string;
