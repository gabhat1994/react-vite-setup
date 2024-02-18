import { type Property } from 'csstype';
import { type AriaRole, type ReactNode, type Ref } from 'react';
import { type CSSProperties } from 'styled-components';

interface ChildrenRenderProps {
  onClose(): void;
}

export interface IBottomSheet {
  children?: ((props: ChildrenRenderProps) => void) | ReactNode;
  /** Test id for tests */
  testId?: string;
  /** Disables closing BottomSheet on backdrop click */
  disableBackdropClick?: boolean;
  /** Disabled closing BottomSheet on `Escape` key press */
  disableEscapeKeyDown?: boolean;
  /** Enables slide in/out animation */
  enableAnimation?: boolean;
  /** enables close button on the top right corner of the BottomSheet to close the BottomSheet */
  enableCloseButton?: boolean;
  /** Fires when component wants to be closed */
  onClose?: () => void;
  /** If `true`, component is shown */
  open: boolean;
  /** full view mode */
  fullHeight?: boolean;

  usePortal?: boolean;

  style?: Pick<
    CSSProperties,
    | 'background'
    | 'borderRadius'
    | 'overflowY'
    | 'padding'
    | 'flexDirection'
    | 'width'
    | 'height'
    | 'transform'
    | 'transition'
    | 'cursor'
    | 'maxWidth'
    | 'maxHeight'
    | 'zIndex'
  >;

  /** Scroll mode for Y-axis. default: `auto`. Pass `null` to remove `overflow-y` */
  targetRef?: Ref<HTMLDivElement>;

  position?: Property.Position;
  id?: string;
  role?: AriaRole;
  'aria-label'?: string;
}

export type IBottomSheetBodyProps = {
  hideScrollbar?: boolean;
  align?: 'center' | 'flex-start';
  overflowY?: CSSProperties['overflowY'];
  minHeight?: CSSProperties['minHeight'];
  flexDirection?: CSSProperties['flexDirection'];
};
