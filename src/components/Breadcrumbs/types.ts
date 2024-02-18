import { type HTMLAttributes } from 'react';
import { type FontType } from '@/components/Typography/Typography';

export interface CommonBreadcrumbsProps {
  /** An icon that will appear on the left side */
  leftIcon?: JSX.Element | null;
  /** An icon that will appear next to leftIcon as a secondary one */
  leftSecondaryIcon?: JSX.Element | null;
  /** An icon that will appear on the right side */
  rightIcon?: JSX.Element | null;
  /** An icon that will appear next to rightIcon as a secondary one */
  rightSecondaryIcon?: JSX.Element | null;
  /** breadcrums title */
  title: string;
  /** title alignment */
  titleAlign?: 'left' | 'center' | 'right';
  /** title font */
  titleFont?: FontType;
}

type HTMLProps = HTMLAttributes<HTMLDivElement>;

export type BreadcrumbsProps = HTMLProps & CommonBreadcrumbsProps;
