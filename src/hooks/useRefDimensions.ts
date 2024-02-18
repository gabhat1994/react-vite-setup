import { type RefObject, useCallback, useLayoutEffect, useState } from 'react';
import useResizeObserver from './useResizeObserver';

export default function useRefDimensions<T extends HTMLElement>(
  ref: RefObject<T>,
) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = useCallback(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }
  }, [ref]);

  useResizeObserver(ref, updateDimensions);

  useLayoutEffect(() => {
    updateDimensions();
  }, [ref, updateDimensions]);

  return dimensions;
}
