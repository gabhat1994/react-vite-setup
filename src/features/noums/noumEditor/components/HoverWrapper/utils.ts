type ColorTokenProps = {
  bgColor: string;
  hoverColor: string;
};

export const getActionButtonColorToken = (
  isTool: boolean = false,
  isDisabled?: boolean,
): ColorTokenProps => {
  const colorData: ColorTokenProps = isTool
    ? {
        bgColor: 'var(--bg-tool-toolbox-brand-primary-default)',
        hoverColor: 'var( --bg-tool-toolbox-brand-primary-hover)',
      }
    : {
        bgColor: 'var(--bg-section-toolbox-default)',
        hoverColor: isDisabled
          ? 'var(--bg-section-toolbox-default)'
          : 'var(--bg-section-toolbox-hover)',
      };
  return colorData;
};
