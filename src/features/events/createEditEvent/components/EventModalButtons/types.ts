import type { ButtonSize } from '@/components/Button/types';

export interface EventModalButtonsProps {
  onCancel: () => void;
  isNoumEditor?: boolean;
  setOpenModal: (v: boolean) => void;
  openModal: boolean;
  btnSize?: ButtonSize;
}
