import { useRef, useLayoutEffect } from 'react';
import * as S from './styles';

interface ObservedProps {
  /** Handler for when the component intersects with the viewport */
  onIntersect: () => void;
  /** Positions the component absolutely to the top if true, bottom otherwise. Default false  */
  reverse?: boolean;
  minHeight?: string;
}

/**
 * Component that positions absolutely to the top or bottom of the container
 * and emits an event if it intersects with the view port using `IntersectionObserver`
 */
export function ObservedDiv({
  onIntersect,
  reverse = false,
  minHeight,
}: ObservedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useRef(onIntersect);

  useLayoutEffect(() => {
    callback.current = onIntersect;
  }, [onIntersect]);

  useLayoutEffect(() => {
    if (!ref.current) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          callback.current();
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <S.Observed
      data-testid="observer"
      position={reverse ? 'top' : 'bottom'}
      ref={ref}
      minHeight={minHeight}
    />
  );
}
