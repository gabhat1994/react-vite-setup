import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import useScrollIntoElement from './useScrollIntoElement';

const useScrollToLocation = (confirmScroll: boolean) => {
  const scrolledRef = useRef(false);
  const { hash } = useLocation();
  const hashRef = useRef(hash);
  const { scrollIntoElement } = useScrollIntoElement();

  useEffect(() => {
    if (hash) {
      // We want to reset if the hash has changed
      if (hashRef.current !== hash) {
        hashRef.current = hash;
        scrolledRef.current = false;
      }
      // only attempt to scroll if we haven't yet (this could have just reset above if hash changed)
      if (!scrolledRef.current && confirmScroll) {
        const id = hash.replace('#', '');
        scrolledRef.current = scrollIntoElement(id);
      }
    }
  });
};
export default useScrollToLocation;
