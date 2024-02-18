import { ModalSize } from '@/components/ExtendedModal/types';

const useModalWidth = (modalSize?: ModalSize) => {
  switch (modalSize) {
    case ModalSize.XXXL:
      return 1130;
    case ModalSize.XXL:
      return 980;
    case ModalSize.XL:
      return 750;
    case ModalSize.L:
      return 600;
    case ModalSize.M:
      return 450;
    case ModalSize.S:
      return 327;
    default:
      return undefined;
  }
};

export default useModalWidth;
