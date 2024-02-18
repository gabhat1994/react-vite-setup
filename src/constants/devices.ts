export const sizes = {
  MOBILE_S: '320px',
  MOBILE_M: '375px',
  MOBILE_L: '425px',
  MOBILE_XL: '480px',
  MOBILE_MAX: '767px',
  TABLET: '768px',
  TABLET_L: '1023px',
  LAPTOP: '1024px',
  LAPTOP_SM: '1160px',
  LAPTOP_M: '1439px',
  LAPTOP_L: '1440px',
  DESKTOP: '2560px',
};

export const breakpoints = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  MOBILE_XL: 480,
  MOBILE_MAX: 767,
  TABLET: 768,
  TABLET_L: 1023,
  LAPTOP: 1024,
  LAPTOP_SM: 1160,
  LAPTOP_M: 1360,
  LAPTOP_L: 1440,
  DESKTOP_S: 1920,
  DESKTOP: 2560,
};

export const mediaSizes = {
  MOBILE_S_MIN: `${breakpoints.MOBILE_S}px`,
  MOBILE_S_MAX: `${breakpoints.MOBILE_M - 1}px`,
  MOBILE_M_MIN: `${breakpoints.MOBILE_M}px`,
  MOBILE_M_MAX: `${breakpoints.MOBILE_L - 1}px`,
  MOBILE_XL_MAX: `${breakpoints.MOBILE_XL - 1}px`,
  MOBILE_L_MIN: `${breakpoints.MOBILE_L}px`,
  MOBILE_L_MAX: `${breakpoints.TABLET - 1}px`,
  TABLET_MIN: `${breakpoints.TABLET}px`,
  TABLET_MAX: `${breakpoints.LAPTOP - 1}px`,
  TABLET_L: `${breakpoints.TABLET_L - 1}px`,
  LAPTOP_MIN: `${breakpoints.LAPTOP}px`,
  LAPTOP_MAX: `${breakpoints.LAPTOP_L - 1}px`,
  LAPTOP_SM_MIN: `${breakpoints.LAPTOP_SM}px`,
  LAPTOP_SM_MAX: `${breakpoints.LAPTOP_SM - 1}px`,
  LAPTOP_M_MIN: `${breakpoints.LAPTOP_M}px`,
  LAPTOP_M_MAX: `${breakpoints.LAPTOP_M - 1}px`,
  LAPTOP_L_MIN: `${breakpoints.LAPTOP_L}px`,
  LAPTOP_L_MAX: `${breakpoints.DESKTOP - 1}px`,
};

export const devices = {
  MOBILE_S: `(min-width: ${sizes.MOBILE_S})`,
  MOBILE_M: `(min-width: ${sizes.MOBILE_M})`,
  MOBILE_L: `(min-width: ${sizes.MOBILE_L})`,
  MOBILE_XL: `(min-width: ${sizes.MOBILE_XL})`,
  MOBILE_MAX: `(min-width: ${sizes.MOBILE_MAX})`,
  TABLET: `(min-width: ${sizes.TABLET})`,
  TABLET_L: `(min-width: ${sizes.TABLET_L})`,
  LAPTOP: `(min-width: ${sizes.LAPTOP})`,
  LAPTOP_L: `(min-width: ${sizes.LAPTOP_L})`,
  DESKTOP: `(min-width: ${sizes.DESKTOP})`,
};

const breakpointsForNoumLayout = {
  TABLET_L: 1023,
  LAPTOP_S: 1024 /* margin 24px, narrow down when sidepanel is displayed */,
  LAPTOP_M: 1280 /* margin 40px, narrow down when sidepanel is displayed */,
  LAPTOP_L: 1441 /* margin dynamic, narrow down when sidepanel is displayed */,
  LAPTOP_XL: 1665 /* margin dynamic, keep 100% container width */,
  DESKTOP: 1920,
};

export const mediaSizesForNoumLayout = {
  TABLET_L_MAX: `${breakpointsForNoumLayout.TABLET_L}px`,
  LAPTOP_S_MIN: `${breakpointsForNoumLayout.LAPTOP_S}px`,
  LAPTOP_S_MAX: `${breakpointsForNoumLayout.LAPTOP_M - 1}px`,
  LAPTOP_M_MIN: `${breakpointsForNoumLayout.LAPTOP_M}px`,
  LAPTOP_M_MAX: `${breakpointsForNoumLayout.LAPTOP_L} - 1}px`,
  LAPTOP_L_MIN: `${breakpointsForNoumLayout.LAPTOP_L}px`,
  LAPTOP_L_MAX: `${breakpointsForNoumLayout.LAPTOP_XL - 1}px`,
  LAPTOP_XL_MIN: `${breakpointsForNoumLayout.LAPTOP_XL}px`,
  LAPTOP_XL_MAX: `${breakpointsForNoumLayout.DESKTOP - 1}px`,
  DESKTOP_MIN: `${breakpointsForNoumLayout.DESKTOP}px`,
};

export const breakpointsForNoumLayoutColumn = {
  SMALL: 475,
  BIG: 680,
  BIG_700PX: 700,
};
