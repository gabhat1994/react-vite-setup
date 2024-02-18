import { useEffect, useMemo } from 'react';

export const useDomEvents = (
  event: string | string[],
  listener: EventListenerOrEventListenerObject,
) => {
  const domEvents = useMemo(
    () => (Array.isArray(event) ? event : [event]),
    [event],
  );

  useEffect(() => {
    domEvents.forEach(($event) =>
      window.addEventListener($event, listener, false),
    );

    return () => {
      domEvents.forEach(($event) =>
        window.removeEventListener($event, listener, false),
      );
    };
  }, [domEvents, listener]);
};
