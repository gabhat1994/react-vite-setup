import { type Ref } from 'react';
import type React from 'react';
import { type CSSProperties } from 'styled-components';
import { type ButtonProps } from '../Button/types';

export enum ModalSize {
  'XXXL',
  'XXL',
  'XL',
  'L',
  'M',
  'S',
}

export interface ModalFooterProps {
  gap?: number;
  isFullScreen?: boolean;
  flexDirection?: CSSProperties['flexDirection'];
  marginTop?: number;
  justifyContent?: CSSProperties['justifyContent'];
  style?: CSSStyleSheet;
  loading?: boolean;
}

export type SpacingMode = 'gap-content' | 'padding-elements';

export interface IModal {
  spacingMode?: SpacingMode;

  /** Modal size */
  size?: ModalSize;
  /** Test id for tests */
  testId?: string;
  /** Disables closing modal on backdrop click */
  disableBackdropClick?: boolean;
  /** close button on the top right cornor of the modal to close the modal */
  closeButtonStyles?: IModalCloseButtonStyle;
  /** Disabled closing modal on `Escape` key press */
  disableEscapeKeyDown?: boolean;
  /** Enables slide in/out animation */
  enableAnimation?: boolean;
  /** enables close button on the top right cornor of the modal to close the modal */
  enableCloseButton?: boolean;
  /** to force hide the close button */
  forceHideCloseButton?: boolean;
  /** Fires when component wants to be closed */
  onClose?: () => void;
  /** If `true`, component is shown */
  open: boolean;
  /** overlay transparency variant */
  overlayVariant?: 'dark' | 'light' | 'none';

  /** full view mode */
  isFullScreen?: boolean;

  /** entire modal will be scrollable */
  isScrollableContent?: boolean;

  /** no padding no border mode */
  noPaddingNoBorder?: boolean;

  style?: Pick<
    CSSProperties,
    | 'background'
    | 'overflowY'
    | 'flexDirection'
    | 'transform'
    | 'transition'
    | 'cursor'
    | 'maxWidth'
    | 'maxHeight'
    | 'textAlign'
    | 'width'
    | 'position'
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'boxShadow'
    | 'opacity'
    | 'padding'
    | 'minHeight'
  >;

  /** Scroll mode for Y-axis. default: `auto`. Pass `null` to remove `overflow-y` */
  targetRef?: Ref<HTMLDivElement>;
  /* Custom styles object can be passed */
  modalHeaderAddonButtons?: React.ReactElement;
  modalFooterAddonButtons?: React.ReactElement;
  customCloseButton?: React.ReactElement;

  hasBackButton?: boolean;

  children?: React.ReactNode;
}

export type IModalBodyProps = {
  mobileFlex?: boolean;
  hasScrollBar?: boolean;
  tabletFlex?: boolean;
  hideScrollbar?: boolean;
  align?: 'center' | 'flex-start';
  overflowY?: CSSProperties['overflowY'];
  overflow?: CSSProperties['overflow'];
  isFullScreen?: boolean;
  minHeight?: CSSProperties['minHeight'];
  maxHeight?: CSSProperties['maxHeight'];
  flexDirection?: CSSProperties['flexDirection'];
  noFooter?: boolean;
  loading?: boolean;
  loadingDescription?: string;
  gap?: CSSProperties['gap'];
};

export interface IModalCloseButtonStyle extends ButtonProps {
  top?: CSSProperties['top'];
  horizontal?: CSSProperties['left'];
  enforceRight?: boolean;
  enforceLeft?: boolean;
  transparentModalCloseButton?: boolean;
  defaultBtnForMobile?: boolean;
  isFullScreen?: boolean;
  color?: string;
}

export type ModalHeaderStyledProps = {
  justifyContent?: CSSProperties['justifyContent'];
  flexDirection?: CSSProperties['flexDirection'];
  size?: ModalSize;
  existGapOverTitle?: boolean;
  bottomPadding?: number;
  topPadding?: number;
} & Pick<IModal, 'spacingMode'>;
