import { type ButtonHTMLAttributes } from 'react';

export type ButtonIntent = 'negative' | 'positive' | undefined;
export type ButtonSize = 'small' | 'full' | 'large' | 'full_small';
export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'neutral';
export type TooltipPosition =
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right'
  | 'bottom-center'
  | 'top-center';

export interface CommonButtonProps {
  /** default undefined */
  intent?: ButtonIntent;
  /** default "normal" */
  size?: ButtonSize;
  /** Render a loading spinner without change the size of the button */
  loading?: boolean;
  /** An icon that will appear on the middle */
  icon?: JSX.Element;
  /** An icon that will appear on the right */
  rightIcon?: JSX.Element;
  /** An icon that will appear on the leftt */
  leftIcon?: JSX.Element;
  /** For buttons with no styling eg Add+ text buttons and icon buttons */
  textOnly?: boolean;
  /** is Primary */
  primary?: boolean;
  /** is Secondary */
  secondary?: boolean;
  /** is Tertiary */
  tertiary?: boolean;
  /** is Neutral */
  neutral?: boolean;
  /** Alignment of text */
  align?: 'left' | 'center' | 'right';
  /** set disabled styling but keep functionality */
  softDisabled?: boolean;
  /** testId to for element selector */
  testId?: string;
  /** testId to for button text */
  textTestId?: string;
  /** spinnerColor on isLoading */
  spinnerColor?: string;
  grow?: boolean;
  tooltipText?: string;
  tooltipPosition?: TooltipPosition;
}

type HTMLButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = HTMLButtonProps & CommonButtonProps;

export type GetColorProps = Pick<
  ButtonProps,
  | 'textOnly'
  | 'primary'
  | 'tertiary'
  | 'intent'
  | 'secondary'
  | 'loading'
  | 'disabled'
  | 'softDisabled'
>;
