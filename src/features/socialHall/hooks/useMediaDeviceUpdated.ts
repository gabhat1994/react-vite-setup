import { useEffect } from 'react';

export const useMediaDeviceUpdated = (callback: () => void) => {
  useEffect(() => {
    if (!navigator.mediaDevices) {
      // eslint-disable-next-line no-console
      console.warn('MediaDevices API not available');
      return;
    }

    navigator.mediaDevices.ondevicechange = () => callback();
  }, [callback]);
};
