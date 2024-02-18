import { useCallback } from 'react';
import { AppBadge } from '@/services/AppBadge';

export function useAppBadge() {
  const setAppBadge = useCallback((newValue: number) => {
    AppBadge.setTitleBadge(newValue);
    AppBadge.setPwaAppBadge(newValue);
  }, []);

  const clearAppBadge = useCallback(() => {
    AppBadge.clearTitleBadge();
    AppBadge.clearPwaAppBadge();
  }, []);

  return {
    setAppBadge,
    clearAppBadge,
  };
}
