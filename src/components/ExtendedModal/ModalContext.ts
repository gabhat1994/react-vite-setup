import { createContext } from 'react';
import {
  type SpacingMode,
  type ModalSize,
} from '@/components/ExtendedModal/types';

export const ModalContext = createContext<{
  size?: ModalSize;
  existCloseButton?: boolean;
  spacingMode?: SpacingMode;
}>({
  size: undefined,
  existCloseButton: false,
  spacingMode: 'padding-elements',
});

export default ModalContext;
