import { useState, useEffect, type RefObject } from 'react';
import { useWindowDimensions } from '@/hooks/dimensions';

export const useElementDimensions = (element: RefObject<HTMLElement>) => {
  const dimens = useWindowDimensions();
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (element.current) {
      setSize({
        width: element.current.offsetWidth,
        height: element.current.offsetHeight,
      });
    }
  }, [element, setSize, dimens]);

  return { size };
};
