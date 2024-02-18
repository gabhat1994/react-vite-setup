import {
  alignToJustify,
  alignToAlignItems,
  numToPx,
  growShrinkToVal,
  wrapToFlexWrap,
} from './helper';

describe('Stack helper test', () => {
  it('[alignToJustify]: Flexbox justify content', () => {
    expect(alignToJustify()).toBe('flex-start');
    expect(alignToJustify('start')).toBe('flex-start');
    expect(alignToJustify('end')).toBe('flex-end');
    expect(alignToJustify('center')).toBe('center');
  });

  it('[alignToAlignItems]: Flexbox align items', () => {
    expect(alignToAlignItems()).toBe('flex-start');
    expect(alignToAlignItems('start')).toBe('flex-start');
    expect(alignToAlignItems('end')).toBe('flex-end');
    expect(alignToAlignItems('center')).toBe('center');
  });

  it('[numToPx]: Convert value to pixel', () => {
    expect(numToPx(100)).toBe('100px');
    expect(numToPx('100%')).toBe('100%');
  });

  it('[growShrinkToVal]: Flex grow', () => {
    expect(growShrinkToVal()).toBe(0);
    expect(growShrinkToVal(true)).toBe(1);
    expect(growShrinkToVal(false)).toBe(0);
    expect(growShrinkToVal('inherit')).toBe('inherit');
  });

  it('[wrapToFlexWrap]: Flex wrap', () => {
    expect(wrapToFlexWrap()).toBe('nowrap');
    expect(wrapToFlexWrap('reverse')).toBe('wrap-reverse');
    expect(wrapToFlexWrap('wrap')).toBe('wrap');
  });
});
