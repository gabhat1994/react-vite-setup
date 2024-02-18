import { useCallback } from 'react';
import { useToastContext } from '@/providers/ToastProvider/context';

export const useToast = () => {
  const { add, remove } = useToastContext();
  const addPrimaryIconToast = useCallback(
    (message: string) => add('primary', 'icon', message),
    [add],
  );

  const addSuccessIconToast = useCallback(
    (message: string) => add('success', 'icon', message),
    [add],
  );

  const addErrorToast = useCallback(
    (message: string) => add('error', 'none', message),
    [add],
  );

  return {
    addToast: add,
    removeToast: remove,
    addPrimaryIconToast,
    addSuccessIconToast,
    addErrorToast,
  };
};

export default useToast;
