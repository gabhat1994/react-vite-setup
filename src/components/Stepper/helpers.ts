export const getStepColor = (isPassed: boolean) =>
  isPassed
    ? 'var(--bg-stepper-brand-primary-default)'
    : 'var(--bg-stepper-brand-secondary-default)';

export const getStepBgColor = (isPassed: boolean) =>
  isPassed ? 'var(--bg-stepper-brand-secondary-default)' : 'transparent';

export const getStepPointBgDimens = (isPassed: boolean) =>
  isPassed ? `height: 20px; width: 20px;` : `height: 10px; width: 10px;`;
