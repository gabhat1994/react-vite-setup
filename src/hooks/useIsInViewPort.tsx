import { type MutableRefObject, type RefObject, useEffect, useState } from 'react';

const useIsInViewPort = (
  ref: MutableRefObject<null> | RefObject<HTMLVideoElement>,
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;
    const observer = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry.isIntersecting),
    );
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};

export default useIsInViewPort;
