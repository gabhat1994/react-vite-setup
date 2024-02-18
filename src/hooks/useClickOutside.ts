import { type RefObject, useEffect } from 'react';

type OnClose = () => void;

type Options = {
  /* Array of DOM element selector to exclude */
  excludes?: string[];

  /* Array of DOM element selector to include */
  includes?: string[];
};

const includeExcludeSelector = (
  optionValue: string[],
  event: MouseEvent | TouchEvent,
) =>
  optionValue.some((includeSelector) => {
    const elements = Array.from(document.querySelectorAll(includeSelector));
    return elements.some((element) => element.contains(event.target as Node));
  });

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  shouldRemoveListeners: boolean | null,
  onClose: OnClose,
  options?: Options,
) => {
  useEffect(() => {
    const clickListener = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        event.target &&
        !ref.current.contains(event.target as Node)
      ) {
        if (options) {
          if (options?.excludes && options?.excludes?.length > 0) {
            const hasExcludedSelector = includeExcludeSelector(
              options.excludes,
              event,
            );
            if (hasExcludedSelector) return;
          }
          if (options?.includes && options.includes?.length > 0) {
            const isClose = includeExcludeSelector(options.includes, event);
            if (!isClose) return;
          }
        }
        onClose();
      }
    };
    const escapeListener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('click', clickListener);
    document.addEventListener('mouseup', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      if (shouldRemoveListeners) {
        document.removeEventListener('click', clickListener);
        document.removeEventListener('mouseup', clickListener);
        document.removeEventListener('keyup', escapeListener);
      }
    };
  }, [shouldRemoveListeners, onClose, ref, options]);
};

export default useClickOutside;
