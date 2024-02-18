import { type StackProps } from './types';

export const alignToJustify = (align?: StackProps['justify']) => {
  switch (align) {
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';
  }

  return align || 'flex-start';
};

export const alignToAlignItems = (align?: StackProps['align']) => {
  switch (align) {
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';
  }

  return align || 'flex-start';
};

export const numToPx = (input: number | string): string => {
  if (typeof input === 'number') {
    return `${input}px`;
  }
  return input;
};

export const growShrinkToVal = (
  input?: StackProps['grow'],
): number | string => {
  if (input === true) {
    return 1;
  }
  if (input === false) {
    return 0;
  }
  return input || 0;
};

export const wrapToFlexWrap = (wrap?: StackProps['wrap']) => {
  if (wrap === 'reverse') {
    return 'wrap-reverse';
  }
  return wrap || 'nowrap';
};
