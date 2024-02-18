/**
 * Returns cleaned percentage
 *
 * @param {number} percentage The number to hight.
 * @return {number} cleaned percentage.
 */
export const cleanPercentage = (percentage: number) => {
  const tooLow = !Number.isFinite(percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : percentage;
};
