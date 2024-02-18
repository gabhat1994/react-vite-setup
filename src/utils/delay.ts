/**
 * Delay the function execution.
 *
 * @param {function} fn target function.
 * @param {number} time delay time.
 * @return {void}.
 */
export function delay(fn: Function, time: number = 10) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, time);
  });
}
