import type React from 'react';
import { useCallback } from 'react';
import { useSubNavContext } from './SubNavContext';
import { type SubNavItemOption } from './types';
import { getNavItemTriggerId } from './utils';

export function useSubNavTrigger<T extends SubNavItemOption>() {
  const { toggle } = useSubNavContext<T>();

  const getSubNavTriggerProps = useCallback(
    (item: T) => {
      const id = getNavItemTriggerId(item);

      return {
        id,
        onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
          e.stopPropagation();
          toggle(item);
        },
      };
    },
    [toggle],
  );

  return { getSubNavTriggerProps };
}
