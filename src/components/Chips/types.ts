import { type HTMLAttributes } from 'react';

type ChipsSize = 'medium' | 'large';

export interface CommonChipsProps {
  /** default "normal" */
  size?: ChipsSize;
  /** An icon that will appear on the left, or the middle for icon buttons */
  icon?: JSX.Element;
  /** An icon that will appear on the right */
  rightIcon?: JSX.Element;
  /** For chips with no styling eg + Add Label to the list */
  textOnly?: boolean;
  /** is Primary */
  primary?: boolean;
  /** is Secondary */
  secondary?: boolean;
  /** Override border radius */
  borderRadius?: string;
}

export type HTMLProps = HTMLAttributes<HTMLSpanElement>;

export type ChipsProps = HTMLProps & CommonChipsProps;
