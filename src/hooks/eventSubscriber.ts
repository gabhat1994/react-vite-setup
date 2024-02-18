import { useRef, useMemo } from 'react';

/**
 * A simple pub-sub used to manage multiple handlers for a single event.
 */
export function useEventSubscriber<Payload, Callback extends Function>() {
  const subscriptions = useRef<Array<Callback>>([]);

  return useMemo(
    () => ({
      subscribe: (callback: Callback) => {
        subscriptions.current.push(callback);
      },
      unsubscribe: (callback: Callback) => {
        subscriptions.current = subscriptions.current.filter(
          (subscriber) => subscriber !== callback,
        );
      },
      unsubscribeAll: () => {
        subscriptions.current = [];
      },
      publish: (payload: Payload) => {
        subscriptions.current.forEach((subscriber) => subscriber(payload));
      },
    }),
    [],
  );
}
