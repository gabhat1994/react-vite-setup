import { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { zIndex } from '@/constants/zIndex';
import { type Placement } from '@popperjs/core';
import { getNavItemSubMenuId, getNavItemTriggerId } from './utils';
import { useSubNavContext } from './SubNavContext';
import { type ChildrenProps, type SubNavItemOption } from './types';

interface SubNavPopperProps<T> {
  children(props: ChildrenProps<T>): JSX.Element;
  placement: Placement;
  skidding?: number;
  distance?: number;
}

export function SubNavPopper<T extends SubNavItemOption>({
  children,
  placement,
  skidding = 0,
  distance = 0,
}: SubNavPopperProps<T>) {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );

  const subNavContext = useSubNavContext<T>();
  const { openItem, close, displayMode } = subNavContext;

  const triggerElement = openItem
    ? document.getElementById(getNavItemTriggerId(openItem))
    : null;
  const { styles, attributes } = usePopper(triggerElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: { offset: [skidding, distance] },
      },
      {
        name: 'preventOverflow',
      },
    ],
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        !triggerElement?.contains(event.target) &&
        !popperElement?.contains(event.target)
      ) {
        close();
      }
    };

    if (triggerElement && displayMode === 'popper') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close, displayMode, popperElement, triggerElement]);

  if (displayMode !== 'popper' || !openItem) {
    return null;
  }

  return (
    <div
      ref={setPopperElement}
      style={{
        ...styles.popper,
        visibility: triggerElement ? 'visible' : 'hidden',
        pointerEvents: triggerElement ? 'initial' : 'none',
        zIndex: zIndex.popper,
      }}
      {...attributes.popper}
      role="menu"
      aria-label={openItem.label}
      id={getNavItemSubMenuId(openItem)}
      tabIndex={0}
    >
      {children(subNavContext)}
    </div>
  );
}
