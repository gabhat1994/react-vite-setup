import { breakpoints } from '@/constants/devices';

/**
 * Returns {x, y} of windows.
 *
 * @return {number, number} dimentions of windows.
 */
export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  const { clientWidth, clientHeight } = document.documentElement;
  return {
    width,
    height,
    clientWidth,
    clientHeight,
  };
}

/**
 * Returns fontsize from height of progress bar.
 *
 * @return {number} fontsize of progressbar label.
 * @param barSize
 */
export function getPBFontSize(barSize?: number) {
  return barSize ? (barSize > 16 ? barSize / 2 : 0) : 12;
}

/**
 * Returns key from breakpoints closest to provided width
 *
 * @param {number} width screen width to get breakpoint
 */
export const getClosestBreakPointKey = (width: number = 2559) =>
  Object.keys(breakpoints).find(
    (key) => width <= breakpoints[key as keyof typeof breakpoints],
  ) || 'DESKTOP';
