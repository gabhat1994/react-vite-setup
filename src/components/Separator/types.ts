import { type HTMLAttributes } from 'react';

interface ISeparatorProps {
  /** Size is thickness of line, value should be in string */
  size?: string;
  fullWidth?: boolean;
  noMargin?: boolean;
  isWithText?: boolean;
  colorToken?: string;
}

type HTMLHRProps = HTMLAttributes<HTMLHRElement>;

export type SeparatorProps = HTMLHRProps & ISeparatorProps;
