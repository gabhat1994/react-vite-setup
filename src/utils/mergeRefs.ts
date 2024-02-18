import { type RefCallback, type MutableRefObject } from 'react';

type Refs<T> = RefCallback<T | null> | MutableRefObject<T | null> | null;

/** Takes multiple ref like objects and merges them together for use as if a
 * single ref. Exists because popperjs uses `useState` instead of a `RefObject`
 * and both PopperJs and I need access to the refs, but I don't want to rely on
 * state update renders or having to use refs within my effect deps */
export function mergeRefs<T>(...refObjects: Array<Refs<T>>) {
  return (ref: T | null) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const refObject of refObjects) {
      if (typeof refObject === 'function') {
        refObject(ref);
      } else if (refObject !== null) {
        refObject.current = ref;
      }
    }
  };
}
