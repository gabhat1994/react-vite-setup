import { type HTMLAttributes, type ForwardedRef } from 'react';
import type React from 'react';
import { type FontType } from '@/components/Typography/Typography';

type HTMLDivProps = HTMLAttributes<HTMLSpanElement>;

type TAccordionBorder = 'top' | 'right' | 'bottom' | 'left';

export interface IAccordionControl {
  toggle: () => void;
}

interface IAccordionProps {
  /** Define borders to be visible. Default: `[bottom]` */
  borders?: TAccordionBorder[];

  /** Define accessibility. Default: `undefined` */
  disabled?: boolean;

  /** Define whether the accordion is controlled in parent-scope or not. Default: `undefined` */
  expanded?: boolean;

  /** Define top margin when it's expanded. Default: `0` */
  expandedOffsetTop?: number;

  /** Define bottom margin when it's expanded. Default: `0` */
  expandedOffsetBottom?: number;

  /** Define paddings of the header. Default: `20px 16px` */
  headerPadding?: string;

  /** Define left component to render. Default: `null` */
  left?: JSX.Element | null;

  /** Define bottom margin that is useful when you list multiple Accordions, similar to spacing between Accordions. Default: `0` */
  offsetBottom?: number;

  /** Define bottom margin that is useful when you list multiple Accordions, similar to spacing between Accordions. Default: `0` */
  offsetTop?: number;

  /**
   * Define whether expand or not on mount. Default: `undefined`
   * When you pass `preExpanded` as `true` | `false`, `expanded` prop is ignored. That is, accordion is controlled internally.
   * */
  preExpanded?: boolean;

  /**
   * Define right component to render next to ChevronDown. Default: undefined
   */
  right?: JSX.Element;

  /**
   * Define shadow when it's expanded. Default `undefined`
   */
  shadowOnExpand?: boolean;

  /** Define subtitle of the Accordion to be shown. Default: `undefined` */
  subtitle?: string | JSX.Element;

  /** Define custom test id. Default: `undefined` */
  testId?: string;

  /** Define title of the Accordion to be shown */
  title: string;
  isBoldTitle?: boolean;
  titleFont?: FontType;
  headerGap?: number;

  /** Define width of the Accordion in `px` or `%`. Default: `100%` */
  width?: string | number;

  /**
   * Define ref for accordion container
   * To access accordion container, you should use this prop instead of default `ref`
   * See storybook
   * */
  accordionRef?: ForwardedRef<HTMLDivElement>;

  /** On expanded or on collapsed */
  onToggle?: (expanded: boolean) => void;

  /** Define accordion content */
  children?: React.ReactNode;

  /** Change this value to force content layout recalculation. Useful for when the content is dynamic and can grow under certain circumstances. */
  contentHeightKey?: string;
}

export type AccordionProps = IAccordionProps & HTMLDivProps;

export interface AccordionContainerProps {
  borders?: TAccordionBorder[];
  expandedOffsetTop: number;
  expandedOffsetBottom: number;
  offsetBottom?: number;
  offsetTop?: number;
  width: string | number;
  expanded?: boolean;
  shadowOnExpand?: boolean;
}
