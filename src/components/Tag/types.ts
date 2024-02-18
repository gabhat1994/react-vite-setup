import { type HTMLAttributes } from 'react';
import { type TProps } from '../Typography/Typography';

type TagSize = 'medium' | 'large' | 'small';

interface ITags {
  /** An avatar that will appear on left */
  avatar?: JSX.Element;
  /** An icon that will appear on the left, or the middle for icon buttons */
  icon?: JSX.Element;
  /** An icon that will appear on the right */
  rightIcon?: JSX.Element;
  /** is Primary */
  primary?: boolean;
  /** is Secondary */
  secondary?: boolean;
  /** is Success */
  success?: boolean;
  /** is Warning */
  warning?: boolean;
  /** is Danger */
  danger?: boolean;
  /** is Tertiary */
  tertiary?: boolean;
  /** tag size */
  size?: TagSize;
  /** override color */
  color?: string;
  /** override background color */
  bgColor?: string;
  contentFont?: TProps['font'];
  /** Has border/outline? */
  border?: boolean;
  /** Content's max width. Default: 40ch */
  contentMaxWidth?: string;
  /** Is cursor a pointer? Otherwise, it will be default */
  isCursorPointer?: boolean;
}

export type TagProps = HTMLAttributes<HTMLSpanElement> & ITags;
