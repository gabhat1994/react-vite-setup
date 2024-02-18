import { type HTMLAttributes } from 'react';

interface IBadgeProps {
  /** Size of badge, value should be in string "medium" or "large"  */
  size?: string;
  /** Text of the Badge to enter */
  text?: string;
}

type HTMLSpanProps = HTMLAttributes<HTMLSpanElement>;

export type BadgeProps = HTMLSpanProps & IBadgeProps;
