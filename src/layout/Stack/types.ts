import { type Property } from 'csstype';

export type StackProps = {
  /**
   * The max width of the container
   */
  maxWidth?: number | string;

  /**
   * The max height of the container
   */
  maxHeight?: number | string;

  /**
   * Inner padding to apply to the stack container element
   */
  padding?: number | string;

  /**
   * The margin to apply to items
   */
  gap?: number | string;

  /**
   * The height to apply to items
   */
  fixedHeight?: number | string;

  /**
   * Sets full-width to the stack container element
   */
  fullWidth?: boolean;

  /**
   * How to align the items within the container
   */
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';

  /**
   * Specify if to use inline-flex, defaults to false
   */
  inline?: boolean;

  /**
   * Define a border bottom
   */
  borderBottom?: boolean;

  /**
   * How to justify the items within the container
   */
  justify?:
    | Property.JustifyContent
    | 'start'
    | 'end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'baseline';

  /**
   * Specify if the stack itself should grow
   * (i.e. if the stack is a child of some other flex element)
   */
  grow?: boolean | number | 'inherit' | 'initial' | 'unset';

  /**
   * Specify if the stack itself should shrink
   * (i.e. if the stack is a child of some other flex element)
   */
  shrink?: boolean | number | 'inherit' | 'initial' | 'unset';

  /**
   * Specify if the flex items are forced onto one lone or can
   * wrap onto multiple line. "wrap" can be useful for expanding a
   * StackItem to full width of it's parent StackContainer
   */
  wrap?: 'wrap' | 'reverse' | 'nowrap' | 'inherit' | 'initial' | 'unset';

  /**
   * Layout items vertically (flex column instead of row)
   */
  vertical?: boolean;

  /**
   * Layout items in reverse of their order
   */
  reverse?: boolean;

  /**
   * if 0 grow not relative to size - it's relative to space
   */
  basis?: string;

  overflow?: Property.Overflow;

  /**
   * The width of the scrollbar
   */
  scrollbarWidth?: number;

  /**
   * The height of the scrollbar
   */
  scrollbarHeight?: number;
};

export type ItemProps = {
  basis?: number | string;
  grow?: boolean | number;
  shrink?: boolean | number;
  padding?: number | string;
  gap?: number | string;
  fixedHeight?: number | string;
  fullWidth?: boolean;
  justifySelf?: Property.JustifySelf;
  alignSelf?: Property.AlignSelf;
  flex?: Property.Flex;
};

export type SpacerProps = {
  isFlex?: boolean;
  height?: string | number;
  width?: string | number;
  'data-testid'?: string;
};
