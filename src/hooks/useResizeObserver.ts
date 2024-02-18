import { useRef, useLayoutEffect, type RefObject } from 'react';

export default function useResizeObserver(
  ref: RefObject<Element>,
  onResize: (react: DOMRectReadOnly) => void,
  disabled?: boolean,
) {
  const observer = useRef<ResizeObserver>();
  const onResizeRef = useRef<(rect: DOMRectReadOnly) => void>(onResize);
  onResizeRef.current = onResize;

  useLayoutEffect(() => {
    const referenceRef = ref.current;

    if (!disabled && referenceRef) {
      observer.current = new ResizeObserver((entries) => {
        onResizeRef?.current(entries[0].contentRect);
      });
      observer.current.observe(referenceRef);
    }

    return () => {
      if (!disabled && referenceRef && observer.current) {
        observer.current.unobserve(referenceRef);
        observer.current.disconnect();
      }
    };
  }, [ref, disabled]);
}
