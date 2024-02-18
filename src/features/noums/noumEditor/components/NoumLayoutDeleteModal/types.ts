import { type SectionToolProps } from '@/screens/Chamber/components/SectionElementRearrange/types';

export type DeleteModalProps = {
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  type: SectionToolProps;
};
