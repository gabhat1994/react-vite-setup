import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { ModalSize } from '@/components/ExtendedModal/types';

const useModalFullScreenMode = (modalSize?: ModalSize) => {
  const { width } = useWindowDimensions();
  const isMobile = width < breakpoints.TABLET;
  const isDesktop = width > breakpoints.TABLET_L;

  switch (modalSize) {
    case ModalSize.XXL:
      return !isDesktop;
    case ModalSize.XL:
      return !isDesktop;
    case ModalSize.L:
      return isMobile;
    case ModalSize.M:
      return isMobile;
    case ModalSize.S:
      return false;
    default:
      return false;
  }
};

export default useModalFullScreenMode;
