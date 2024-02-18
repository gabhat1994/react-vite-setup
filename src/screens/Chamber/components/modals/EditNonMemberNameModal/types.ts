import type React from 'react';
import { type ButtonIntent, type ButtonType } from '@/components/Button/types';

interface EditNonMemberNameModalAdditionalParams {
  noumName?: string;
  elementTitle?: string;
}

export type EditNonMemberNameModalProps = {
  title?: string;
  body?: React.ReactNode;
  description?: string;
  noumName?: string;
  positiveBtnLabel?: string;
  positiveBtnType?: ButtonType;
  positiveBtnIntent?: ButtonIntent;
  negativeBtnLabel?: string;
  extraBtnLabel?: string;
  isOpen: boolean;
  isWaiting?: boolean;
  textForWaiting?: string | undefined;
  isLoading?: boolean;
  cancelCallback?: () => void;
  confirmCallback: () => void;
  extraBtnCallback?: () => void;
  stopProcess?: () => void;
  additionalParams?: EditNonMemberNameModalAdditionalParams;
};
