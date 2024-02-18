import { type RefObject, useEffect, useState } from 'react';

export default function useElementOnScreen(
  ref: RefObject<Element>,
  options: IntersectionObserverInit | undefined = undefined,
) {
  const [isVisible, setIsVisible] = useState(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(callback, options);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options, ref]);

  return isVisible;
}
