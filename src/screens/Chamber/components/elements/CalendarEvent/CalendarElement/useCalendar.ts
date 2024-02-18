import { useEffect, useState, type RefObject } from 'react';

import useResizeObserver from '@/hooks/useResizeObserver';

export const useCalendar = (childrenRef: RefObject<HTMLDivElement>) => {
  const [viewMode, setViewMode] = useState<string>('list');
  const [childrenHeight, setChildrenHeight] = useState<number>();

  useResizeObserver(childrenRef, () => {
    setChildrenHeight(childrenRef?.current?.scrollHeight || 0);
  });

  useEffect(() => {
    if (!childrenHeight) {
      setChildrenHeight(childrenRef.current?.clientHeight);
    }
  }, [childrenHeight, childrenRef]);

  return {
    viewMode,
    setViewMode,
    childrenHeight,
  };
};
