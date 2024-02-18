import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from './dimensions';

export function useBreakpoints() {
  const windowDimensions = useWindowDimensions();
  const { width } = windowDimensions;
  const isMobile = width < breakpoints.TABLET;
  const isTablet = width >= breakpoints.TABLET && width < breakpoints.LAPTOP;
  const isSmallerThanLaptop = width < breakpoints.LAPTOP;
  const isLaptop = width >= breakpoints.LAPTOP && width < breakpoints.DESKTOP;
  // TODO: This is incorrect and needs to be refactored. Could be called e.g. `isLaptopOrBigger`.
  const isDesktop = width >= breakpoints.LAPTOP;
  // const isDesktop = width >= breakpoints.DESKTOP

  return {
    isTablet,
    isMobile,
    isSmallerThanLaptop,
    isLaptop,
    isDesktop,
    windowDimensions,
  };
}
