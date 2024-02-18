import { breakpoints } from '@/constants/devices';
import {
  getWindowDimensions,
  getPBFontSize,
  getClosestBreakPointKey,
} from './dimens';

describe('getWindowDimensions', () => {
  test('get window with and height', () => {
    expect(getWindowDimensions().width).toBe(window.innerWidth);
    expect(getWindowDimensions().height).toBe(window.innerHeight);
  });
});

describe('getPBFontSize', () => {
  test('get progress bar font size', () => {
    expect(getPBFontSize()).toBe(12);
    expect(getPBFontSize(15)).toBe(0);
    expect(getPBFontSize(20)).toBe(10);
  });
});

describe('getClosestBreakPointKey', () => {
  test('get closest key to screen width', () => {
    expect(getClosestBreakPointKey()).toBe('DESKTOP');
    expect(getClosestBreakPointKey(2561)).toBe('DESKTOP');
    expect(getClosestBreakPointKey(breakpoints.TABLET_L)).toBe('TABLET_L');
    expect(getClosestBreakPointKey(breakpoints.LAPTOP)).toBe('LAPTOP');
  });
  Object.keys(breakpoints).map((key) => {
    const i = key as keyof typeof breakpoints;
    test(`get closest key (${i}) to screen width = ${breakpoints[i]}`, () => {
      expect(getClosestBreakPointKey(breakpoints[i])).toBe(i);
    });
    return i;
  });
});
