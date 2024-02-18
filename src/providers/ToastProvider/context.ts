import { type AlertButtonType, type AlertType } from '@/components/Toast/types';
import { createContext, useContext } from 'react';

export const ToastContext = createContext<{
  add: (
    type: AlertType,
    buttonType: AlertButtonType,
    message: string,
    autoHideDisable?: boolean,
    width?: number,
  ) => string | null;
  remove: (id: string) => void;
}>({
  add: () => null,
  remove: () => null,
});

export function useToastContext() {
  return useContext(ToastContext);
}
