import { useState, useEffect } from 'react';
import { getWindowDimensions } from '@/utils/dimens';
import { throttle } from 'lodash';

export type WindowDimensions = {
  width: number;
  height: number;
  clientWidth: number;
  clientHeight: number;
};

export function useWindowDimensions(): WindowDimensions {
  const [windowDimens, setWindowDimens] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = throttle(
      () => {
        setWindowDimens(getWindowDimensions());
      },
      300,
      { leading: false, trailing: true },
    );

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimens;
}
