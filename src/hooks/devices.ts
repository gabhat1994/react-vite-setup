import { breakpoints } from '@/constants/devices';
import { useMemo } from 'react';
import { useWindowDimensions } from './dimensions';

export enum DeviceTypeEnum {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  LAPTOP = 'laptop',
  DESKTOP = 'desktop',
}

export const useDeviceType = () => {
  const { width } = useWindowDimensions();

  const deviceType = useMemo(() => {
    if (width < breakpoints.TABLET) {
      return DeviceTypeEnum.MOBILE;
    }
    if (width < breakpoints.LAPTOP) {
      return DeviceTypeEnum.TABLET;
    }
    if (width < breakpoints.DESKTOP) {
      return DeviceTypeEnum.LAPTOP;
    }
    return DeviceTypeEnum.DESKTOP;
  }, [width]);

  return deviceType;
};
